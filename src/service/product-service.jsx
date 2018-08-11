/*Product-Service*/
import MUtil from "util/mm.jsx";
const _mm = new MUtil();

export default class Product {
   // 获取商品列表信息:
   getProductList(listParam) {
      let url = "",
          data = {};
      if (listParam.listType === "list") {
         url = "/manage/product/list.do";
         data.pageNum = listParam.pageNum;
      } else if (listParam.listType === "search") {
         url = "/manage/product/search.do";
         data.pageNum = listParam.pageNum;
         data[listParam.searchType] = listParam.searchKeyword;
      }
      return _mm.request({
         type: "post",
         url: url,
         data: data
      });
   }

   // 获取商品详情信息
   getProduct(productId) {
      return _mm.request({
         type: "post",
         url: "/manage/product/detail.do",
         data: {
            productId: productId || 0
         }
      });
   }

   // 变更商品销售状态信息:
   setProductStatus(productInfo) {
      return _mm.request({
         type: "post",
         url: "/manage/product/set_sale_status.do",
         data: productInfo
      });
   }

   // 分类相关:(请求一级分类信息 / 二级分类信息)
   getCategoryList(parentCategoryId) {
      return _mm.request({
         type: "post",
         url: "/manage/category/get_category.do",
         data: {
            categoryId: parentCategoryId || 0
         }
      });
   }

   // 检查保存商品的表单数据信息
   checkProduct(product) {
      let result = {
         status: true,
         mag: "验证通过"
      };
      // 判断商品名是否为空
      if (typeof product.name !== "string" || product.name.length === 0) {
         return {
            status: false,
            mag: "商品名称不能为空!"
         }
      }
      // 验证商品分类的ID
      if (typeof product.categoryId !== "number" || !(product.categoryId > 0)) {
         return {
            status: false,
            msg: "请选择商品品类!"
         }
      }
      // 判断描述是否为空
      if (typeof product.subtitle !== "string" || product.subtitle.length === 0) {
         return {
            status: false,
            msg: "商品描述不能为空"
         }
      }
      // 判断商品价格为数字,且大于0
      if (typeof product.price !== "number" || !(product.price >= 0)) {
         return {
            status: false,
            msg: "请输入正确的商品价格"
         }
      }
      // 判断库存位数字,且大于等于0
      if (typeof product.stock !== "number" || !(product.stock >= 0)) {
         return {
            status: false,
            msg: "请输入正确的库存数量"
         }
      }
      return result;
   }

   // 保存商品数据信息
   saveProduct(product) {
      return _mm.request({
         type: "post",
         url: "/manage/product/save.do",
         data: product
      });
   }

   // 新增品类信息
   saveCategory(category) {
      return _mm.request({
         type: "post",
         url: "/manage/category/add_category.do",
         data: category
      });

   }

   // 修改更新品类名称信息
   updateCategoryName(category) {
      return _mm.request({
         type: "post",
         url: "/manage/category/set_category_name.do",
         data: category
      })
   }

}