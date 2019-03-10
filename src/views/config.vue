<template>
  <div class="lite">
    <el-card class="right details" size="mini" v-if="form.data && view == 'form'">
      <div slot="header">
        <span>网站信息配置</span>
      </div>
      <site-form :data="form.data" :is-new="form.isNew" @save="handleSave"> </site-form>
    </el-card>
    <div v-if="view == 'loading'">
      <div class="weui-loadmore" v-if="loading">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
    </div>
    <el-alert :title="message" type="info" description="页面加载过程中发生错误" show-icon v-if="view == 'error'"> </el-alert>
  </div>
</template>
<script>
import _ from 'lodash';
import { mapState, createNamespacedHelpers } from 'vuex';
import SiteForm from '@/components/site-form';

const { mapActions } = createNamespacedHelpers('site');

export default {
  components: {
    SiteForm,
  },
  metaInfo: {
    title: '网站配置',
  },
  async mounted() {
    const res = await this.getConfig();
    if (this.$checkRes(res)) {
      if (!res.data) {
        this.message = '分站还未开通';
        this.view = 'error';
      } else {
        this.form = { data: res.data, isNew: false };
        this.view = 'form';
      }
    } else {
      this.message = res.message;
      this.view = 'error';
    }
  },
  data() {
    return {
      view: 'loading',
      message: '',
      form: {},
    };
  },
  methods: {
    ...mapActions(['getConfig', 'setConfig']),
    async handleSave(payload) {
      const res = await this.setConfig(payload);
      this.$checkRes(res, '配置保存成功');
    },
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>
<style lang="less" scoped>
@import '~@/style/lite.less';
</style>
