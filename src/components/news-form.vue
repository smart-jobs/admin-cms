<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
    <slot>
      <el-form-item label="标题" prop="title" :required="true">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="发布单位" prop="issuer" :required="true">
        <el-input v-model="form.issuer"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" :required="true">
        <wang-editor v-model="form.content"></wang-editor>
      </el-form-item>
      <el-form-item label="附件" prop="attachment">
        <file-upload v-model="form.attachment"></file-upload>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <tags v-model="form.tags" add-text="添加标签"></tags>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="mini">保存</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script>
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import WangEditor from './editor/wang-editor';
import FileUpload from './editor/file-upload';
import Tags from './editor/tags';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

const { mapActions } = createNamespacedHelpers('naf/dict');

export default {
  components: {
    WangEditor,
    FileUpload,
    Tags,
  },
  name: 'news-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      form: _.cloneDeep(this.data),
      rules: {
        title: requiredAndMaxlen('标题', 100),
        issuer: requiredAndMaxlen('发布单位', 64),
        content: requiredAndMaxlen('内容', 102400),
      },
      units: [],
    };
  },
  methods: {
    handleSave({ action }) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('save', { isNew: this.isNew, data: this.form, action });
        } else {
          console.warn('form validate error!!!');
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  width: 700px;
}
</style>
