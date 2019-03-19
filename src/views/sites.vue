<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>高校分站列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew">添加分站</el-button>
      </div>
      <data-grid
        :data="items"
        :meta="fields"
        :operation="listOper"
        :paging="true"
        :total="total"
        @query="handleQuery"
        @edit="handleEdit"
        @delete="handleDelete"
      >
      </data-grid>
    </el-card>
    <el-card class="right details" size="mini" v-else-if="view == 'form'">
      <div slot="header">
        <span>{{ form.isNew ? '添加分站信息' : '修改分站配置' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <site-form :data="form.data" :is-new="form.isNew" @save="handleSave" @cancel="view = 'list'"> </site-form>
    </el-card>
  </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';
import DataGrid from '@naf/data/filter-grid';
import SiteForm from '@/components/site-form';
import { createNamespacedHelpers } from 'vuex';
import config from '@frame/config';
const { pageSize = 10 } = config;

const { mapState, mapActions } = createNamespacedHelpers('site');

export default {
  components: {
    DataGrid,
    SiteForm,
  },
  metaInfo: {
    title: '分站管理',
  },
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'site', label: '分站标识' },
        { name: 'name', label: '分站名称' },
        { name: 'domain', label: '分站域名' },
        { name: 'meta.createdAt', label: '创建时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
      ],
      listOper: [['edit', '修改', 'el-icon-edit'], ['delete', '删除', 'el-icon-delete', true]],
      feedbackItems: [],
    };
  },
  methods: {
    ...mapActions(['query', 'fetch', 'create', 'update', 'delete']),
    async handleQuery({ filter, paging } = {}) {
      this.view = 'list';
      const res = await this.query({ status: this.status, paging });
      this.$checkRes(res);
    },
    handleNew() {
      this.form = { data: {}, isNew: true };
      this.view = 'form';
    },
    async handleEdit({ site }) {
      const res = await this.fetch({ site });
      this.$checkRes(res, () => {
        this.form = { data: { ...res.data }, isNew: false };
        this.view = 'form';
      });
    },
    async handleSave(payload) {
      let res, msg;
      if (payload.isNew) {
        res = await this.create(payload);
        msg = '分站添加成功';
      } else {
        const { site } = payload.data;
        res = await this.update({ site, ...payload });
        msg = '信息修改成功';
      }
      if (this.$checkRes(res, msg)) {
        this.view = 'list';
      }
    },
    async handleDelete({ site }) {
      const res = await this.delete({ site });
      this.$checkRes(res, '删除分站成功');
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    status() {
      return this.$route.params.status || 'new';
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
