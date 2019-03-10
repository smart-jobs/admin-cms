<template>
  <el-upload
    class="upload-demo"
    action="/files/cms/attachment/upload"
    :limit="limit"
    v-once
    :file-list="[...this.fileList]"
    :on-preview="handlePreview"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
  >
    <el-button size="mini" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">文件大小不能超过5MB</div>
  </el-upload>
</template>
<script>
export default {
  name: 'file-upload',
  model: {
    prop: 'value',
    event: 'change', // 默认为input时间，此处改为change
  },
  props: {
    value: { type: Array, required: false, default: () => [] },
    limit: { type: Number, required: false, default: 3 },
  },
  data() {
    return {
      fileList: [...this.value],
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleSuccess(res, file) {
      console.log({ res, file });
      if (res.errcode !== 0) {
        this.$notify.error({
          title: '错误',
          message: '文件上传失败',
        });
        return;
      }
      this.fileList.push({ name: file.name, uri: res.uri, uid: file.uid });
      this.$emit('change', this.fileList);
      this.$message({ type: 'success', message: '文件上传成功' });
      return true;
    },
    beforeRemove(file, fileList) {
      const isExisted = this.fileList.some(p => p.uid === file.uid);
      if (!isExisted) {
        return true;
      }
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        const idx = this.fileList.findIndex(p => p.name === file.name);
        if (idx != -1) {
          this.fileList.splice(idx, 1);
          this.$emit('change', this.fileList);
        }
      });
    },
    beforeUpload(file) {
      // TODO: 检查文件是否已上传
      const isExisted = this.fileList.some(p => p.name === file.name);
      if (isExisted) {
        console.warn(`文件${file.name}已存在，不能重复上传!`);
        return false;
      }

      // TODO: 检查文件大小
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        //this.$message.error("上传确认函图片大小不能超过 2MB!");
        this.$message({ type: 'error', message: '上传文件大小不能超过 5MB!', duration: 3000 });
        return false;
      }
      return true;
    },
    handleChange(file, fileList) {
      const newList = fileList.map(p => ({ name: p.name, uri: p.uri }));
      this.$emit('change', newList);
    },
  },
};
</script>
