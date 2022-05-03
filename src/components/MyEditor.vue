<template>
  <div style="border: 1px solid #ccc; height: 300px">
    <div id="toolbar-container" ref="toolbar"></div>
    <div id="editor-container" ref="editor"></div>
  </div>
</template>

<script>
// npm 安装
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'

// // 【注意】下面使用的 typescript 语法。如用 javascript 语法，把类型去掉即可。
export default {
  mounted() {
    const editorConfig = {}
    editorConfig.placeholder = '请输入内容'
    editorConfig.onChange = editor => {
      // 当编辑器选区、内容变化时，即触发
      // console.log('content', editor.children)
      // console.log('html', editor.getHtml())
      // console.log(editor)
      this.$emit('sendEditor', editor.getHtml())
    }

    // 创建编辑器
    const editor = createEditor({
      selector: '#editor-container',
      config: editorConfig,
      mode: 'default' // 或 'simple' 参考下文
    })
    // 创建工具栏
    createToolbar({
      editor,
      selector: '#toolbar-container',
      mode: 'default' // 或 'simple' 参考下文
    })
  }
}
</script>
