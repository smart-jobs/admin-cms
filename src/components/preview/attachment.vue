<template>
  <section class="attachment" v-if="hasData">
    <h4>附件:</h4>
    <ol>
      <li v-for="(item, index) in data" :key="index">
        <a target="_blank" :href="item.uri">{{ item.name }}</a>
      </li>
    </ol>
  </section>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'news-attachment',
  props: {
    data: { type: Array, required: true },
  },
  computed: {
    hasData() {
      return _.isArray(this.data) && this.data.length > 0;
    },
  },
};
</script>
<style lang="less" scoped>
.attachment {
  padding: 2em;
  h4 {
    color: gray;
  }
  ol {
    list-style-position: inside;
  }
}
</style>
