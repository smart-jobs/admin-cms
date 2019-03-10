<template>
  <section class="main">
    <div class="content" v-html="data.content"></div>
  </section>
</template>
<script>
export default {
  name: 'news-content',
  props: {
    data: { type: Object, required: true },
  },
};
</script>
<style lang="less" scoped>
.main {
  padding: 10px 20px;
  .content {
    margin-top: 20px;
    text-indent: 2em;
  }
}
</style>
