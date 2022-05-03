<template>
  <el-upload ref="upload" class="upload-demo" :action="url" :on-change="handleChange" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList">
    <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
  </el-upload>
</template>
<script>
import base from '@/api/base'
export default {
  data() {
    return {
      fileList: [],
      url: base.uploadUrl,
      imgUrl: ''
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
      // console.log(file.response.url)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove() {},
    handleSuccess(response) {
      this.$message({
        message: '恭喜你，图片上传成功!',
        type: 'success'
      })
      // console.log(response.url.slice(7))
      const imgUrl = `http://${base.host}/${response.url.slice(7)}`
      // console.log(imgUrl)
      this.imgUrl = imgUrl
      this.$emit('closeImg', this.imgUrl)
    }
  }
}
</script>
