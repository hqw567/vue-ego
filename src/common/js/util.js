/***
 * export2Excel(columns,list) 导出excel表格
 * columns Arrary=[{},{}]  表头 =[{title:'',key:''}]
 * list =[] table的数据 [{},{}]
 */
export function export2Excel(columns, list, name) {
  require.ensure([], () => {
    const { exportJsonToExcel } = require('../../excel/Export2Excel')
    const tHeader = []
    const filterVal = []
    console.log(columns)
    if (!columns) {
      return
    }
    columns.forEach(item => {
      tHeader.push(item.title)
      filterVal.push(item.key)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    exportJsonToExcel(tHeader, data, name)
  })
}
