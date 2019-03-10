<template>
  <div class="page" id="app">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: '网站管理',
    titleTemplate: '网站管理 - %s',
  },
  async mounted() {
    // const res = await this.load();
    // this.$checkRes(res, () => {});
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>

<style scoped>
.weui-loadmore {
  position: absolute;
  top: 40%;
  width: 100%;
}
.page {
  width: 100%;
  height: 100%;
}
</style>
