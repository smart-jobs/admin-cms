<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>{{ columnName }} - 信息列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew">发布信息</el-button>
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
        @restore="handleRestore"
        @preview="handlePreview"
      >
        <template slot="post">
          <el-table-column width="48" label="..." align="center">
            <div slot-scope="scope">
              <el-tooltip content="包含附件" class="icon" v-if="scope.row.attachment &amp;&amp; scope.row.attachment.length &gt; 0">
                <span><i class="naf-icons naf-icon-attachment"></i></span>
              </el-tooltip>
            </div>
          </el-table-column>
        </template>
      </data-grid>
    </el-card>
    <el-card class="right details" size="mini" v-else-if="view == 'form'">
      <div slot="header">
        <span>{{ columnName }} - {{ form.isNew ? '发布信息' : '修改信息' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <news-form :data="form.data" :is-new="form.isNew" @save="handleSave" @cancel="view = 'list'"> </news-form>
    </el-card>
    <el-card class="right details" size="mini" v-else>
      <div slot="header">
        <span>{{ columnName }} - 信息预览</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <preview :data="current" />
    </el-card>
  </div>
</template>
<script>
import DataGrid from '@naf/data/filter-grid';
import NewsForm from '@/components/news-form';
import Preview from '@/components/preview';
import { createNamespacedHelpers } from 'vuex';
import config from '@frame/config';
const { pageSize = 10 } = config;

const { mapState, mapActions } = createNamespacedHelpers('news');
const { mapActions: mapDict } = createNamespacedHelpers('naf/dict');

export default {
  components: {
    NewsForm,
    DataGrid,
    Preview,
  },
  metaInfo: {
    title: '信息管理',
  },
  created() {
    this.loadDict('column');
  },
  mounted() {
    this.handleQuery();
  },
  data() {
    return {
      view: 'list',
      form: {},
      fields: [
        { name: 'column', label: '栏目', formatter: 'dict:column' },
        { name: 'title', label: '标题', listOpts: { width: 200 } },
        { name: 'meta.state', label: '状态', formatter: this.statusLabel },
        { name: 'meta.createdAt', label: '创建时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
        { name: 'meta.updatedAt', label: '修改时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
      ],
      listOper: [
        ['preview', '预览', 'el-icon-view'],
        ['edit', '编辑', 'el-icon-edit'],
        ['delete', '删除', 'el-icon-delete', true],
        ['restore', '恢复', 'el-icon-refresh', true],
      ] /* 操作类型 */,
    };
  },
  methods: {
    ...mapActions(['query', 'create', 'delete', 'restore', 'update', 'fetch']),
    ...mapDict({ loadDict: 'load' }),
    async handleEdit({ id }) {
      const res = await this.fetch({ id });
      this.$checkRes(res, () => {
        this.form = { data: res.data, isNew: false };
        this.view = 'form';
      });
    },
    async handlePreview({ id }) {
      const res = await this.fetch({ id });
      this.$checkRes(res, () => {
        this.view = 'preview';
      });
    },
    handleNew() {
      this.form = { data: {}, isNew: true };
      this.view = 'form';
    },
    async handleSave(payload) {
      let res, msg;
      if (payload.isNew) {
        res = await this.create({ column: this.column, ...payload });
        msg = '信息添加成功';
      } else {
        const { id } = payload.data;
        res = await this.update({ id, ...payload });
        msg = '信息修改成功';
      }
      if (this.$checkRes(res, msg)) {
        this.view = 'list';
      }
    },
    async handleDelete({ id }) {
      const res = await this.delete({ id });
      this.$checkRes(res, '删除数据成功');
    },
    async handleRestore({ id }) {
      const res = await this.restore({ id });
      this.$checkRes(res, '恢复数据成功');
    },
    async handlePost({ id }) {
      this.view = 'list';
      const res = await this.post({ id });
      this.$checkRes(res, '递送公文成功');
    },
    async handleQuery({ filter, paging } = {}) {
      this.view = 'list';
      const res = await this.query({ column: this.column, paging });
      this.$checkRes(res);
    },
    statusLabel: (row, column, cellValue, index) => {
      switch (cellValue) {
        case 0:
          return '正常';
        case 1:
          return '删除';
        default:
          return cellValue;
      }
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    column() {
      return this.$route.params.column;
    },
    columnName() {
      if (this.column) return this.$dict('column', this.column);
      return '';
    },
  },
  watch: {
    // call again the method if the route changes
    column: 'handleQuery',
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
