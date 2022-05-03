const base = {
  host: 'localhost:8989',
  goodsList: '/api/api/projectList', // 商品列表
  goodsSearch: '/api/api/search',
  selectItemCategory: '/api/api/backend/itemCategory/selectItemCategoryByParentId',
  uploadUrl: '/api/api/upload',
  addGoods: '/api/api//backend/item/insertTbItem',
  deleteGoods: '/api/api/backend/item/deleteItemById', // 删除商品
  updateGoods: '/api/api/backend/item/updateTbItem', // 编辑商品
  login: '/api/api/login',
  params: '/api/api/backend/itemParam/selectItemParamAll'
}

export default base
