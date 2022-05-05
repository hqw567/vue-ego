<template>
  <div>
    <!-- 发票 -->
    <div class="money">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button @click="download" style="float: right; padding: 3px 0" type="text">下载发票</el-button>
            </div>
            <div class="text item">
              <img ref="img" style="width: 400px" :src="imgUrl" alt="" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button @click="downs" style="float: right; padding: 3px 0" type="text">下载不同源发票</el-button>
            </div>
            <div class="text item">
              <img ref="myimg" style="width: 400px" :src="imgUrl" alt="" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button @click="down" style="float: right; padding: 3px 0" type="text">下载本地发票</el-button>
            </div>
            <div class="text item">
              <img class="img1" style="width: 400px" :src="imgUrl" alt="" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 3. 导出表格 -->
    <div class="table">
      <div class="header">
        <div class="title">用户信息</div>
        <el-button @click="exportData" size="small">导出表格</el-button>
      </div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import img from '../../assets/images/11.jpg'
import { export2Excel } from '../../common/js/util'
export default {
  name: 'my-user',
  data() {
    return {
      imgUrl: img,
      columns: [
        // 定义表头
        { title: '日期', key: 'date' },
        { title: '姓名', key: 'name' },
        { title: '地址', key: 'address' }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    download() {
      const url = this.$refs.img.src
      open(url, '_blank')
    },
    down() {
      const alink = document.createElement('a')
      alink.href = this.$refs.myimg.src
      alink.download = 'pic'
      alink.click()
    },
    /**
     * 解决图片不同源下载
     */
    downloadIamge(imgsrc, name) {
      const image = new Image()
      console.log(image)
      image.setAttribute('crossorigin', 'anonymous')
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据 图片格式，默认为 image/png
        const a = document.createElement('a') // 生成一个a元素
        const event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    downs() {
      this.downloadIamge(this.$refs.myimg.src, 'pic')
    },
    /**
     * 导出
     */
    exportData() {
      // export2Excel('表头','需要导出的数据')
      export2Excel(this.columns, this.tableData, '用户列表')
    }
  }
}
</script>

<style></style>
