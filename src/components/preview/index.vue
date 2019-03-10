<template>
  <article>
    <news-header :data="data"></news-header>
    <news-content :data="data"></news-content>
    <news-attachment :data="data.attachment"></news-attachment>
  </article>
</template>
<script>
import NewsHeader from './header';
import NewsAttachment from './attachment';
import NewsContent from './content';

export default {
  components: {
    NewsHeader,
    NewsAttachment,
    NewsContent,
  },
  name: 'preview',
  props: {
    data: { type: Object, required: true },
  },
};
</script>
