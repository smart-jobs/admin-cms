<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
    <slot>
      <el-form-item label="所属高校" prop="site" :required="true" v-if="isNew">
        <code-select category="unit" v-model="form.site" placeholder="请选择分站所属高校" :disabled="$route.params.unit != undefined"> </code-select>
      </el-form-item>
      <el-form-item label="网站名称" prop="name" :required="true">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="网站域名" prop="domain" :required="true">
        <el-input v-model="form.domain"></el-input>
      </el-form-item>
      <el-form-item label="版权声明" prop="copyright" :required="true">
        <el-input v-model="form.copyright"></el-input>
      </el-form-item>
      <el-form-item label="关于内容" prop="content" :required="true">
        <wang-editor v-model="form.content"></wang-editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="mini">保存</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script>
import _ from 'lodash';
import { createNamespacedHelpers } from 'vuex';
import WangEditor from './editor/wang-editor';
import CodeSelect from '@naf/data/code-select';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

const { mapActions } = createNamespacedHelpers('naf/dict');

export default {
  components: {
    WangEditor,
    CodeSelect,
  },
  name: 'site-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      form: _.cloneDeep(this.data),
      rules: {
        site: requiredAndMaxlen('网站表示', 6),
        name: requiredAndMaxlen('网站名称', 20),
        domain: requiredAndMaxlen('网站域名', 40),
        copyright: requiredAndMaxlen('版权声明', 100),
        content: requiredAndMaxlen('内容', 102400),
      },
      units: [],
    };
  },
  async mounted() {
    this.units = await this.load('unit');
  },
  methods: {
    ...mapActions(['load']),
    handleSave({ action }) {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('save', { isNew: this.isNew, data: this.form, action });
        } else {
          console.warn('form validate error!!!');
        }
      });
    },
    handleCancel(value) {
      this.form = _.cloneDeep(this.data);
      this.$emit('cancel');
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  width: 700px;
}
</style>
