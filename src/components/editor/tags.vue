<template>
  <div class="container">
    <el-tag size="medium" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ {{ addText }}</el-button>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change', // 默认为input时间，此处改为change
  },
  props: {
    value: { type: Array, required: false, default: () => [] },
    addText: { type: String, required: false, default: '添加' },
  },
  data() {
    return {
      dynamicTags: [...this.value],
      inputVisible: false,
      inputValue: '',
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$emit('change', this.dynamicTags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && !this.dynamicTags.includes(inputValue)) {
        this.dynamicTags.push(inputValue);
        this.$emit('change', this.dynamicTags);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
//.el-tag + .el-tag {
.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  height: 28px;
  line-height: 26px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
