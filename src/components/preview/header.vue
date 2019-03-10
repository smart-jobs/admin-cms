<template>
  <section class="header">
    <h1 class="title">{{ data.title }}</h1>
    <p class="desc">{{ data.docno }}</p>
  </section>
</template>
<script>
export default {
  name: 'news-header',
  props: {
    data: { type: Object, required: true },
  },
};
</script>
<style lang="less" scoped>
.header {
  text-align: center;
  padding: 10px 20px;
  .title {
    text-align: center;
    font-size: 1.5em;
    padding: 10px 20px;
  }
  .desc {
    color: gray;
    padding: 10px 20px;
  }
}
</style>
