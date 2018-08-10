/*Category-Component*/
/*品类管理页面*/

import React from "react";
/*工具*/
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import Product from "service/product-service.jsx";
const _product = new Product();
/*组件*/
import PageTitle from "component/page-title/index.jsx";
/*样式文件*/
import "./index.scss";


export default class CategoryAdd extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         categoryList: [],
         parentId: 0,
         categoryName: ""
      };
   }
   // 组件加载之后
   componentDidMount() {
      // 调用加载分类列表方法
      this.loadCategoryList();
   }

   // 加载品类列表的方法,显示父品类列表
   loadCategoryList() {
      _product.getCategoryList().then(res => {
         this.setState({
            categoryList: res
         });
      }, errMsg => {
         _mm.errorTips(errMsg);
      });
   }

   // 当表单的value发生改变触发的事件
   onValueChange(e) {
      let name = e.target.name,
          value = e.target.value;
      this.setState({
         [name]: value
      })
   }

   // 提交品类数据
   onSubmit() {
      let categoryName = this.state.categoryName.trim();
      if (categoryName) {
         // 名称不为空,提交数据
         _product.saveCategory({
            parentId: this.state.parentId,
            categoryName
         }).then((res) => {
            _mm.successTips(res);
            // 数据提交完成后跳转页面
            this.props.history.push("/product-category/index");
         }, (err) => {
            _mm.errorTips(err)
         })
      } else {
         // 否则提示错误
         _mm.errorTips("请输入品类名称!");
      }
   }

   render(){
      return (
         <div id="page-wrapper">
            <PageTitle title="品类列表"/>
            <div className="row">
               <div className="col-md-12">
                  <div className="form-horizontal">

                     {/*所属品类*/}
                     <div className="form-group">
                        <label className="col-md-2 control-label">所属品类</label>
                        <div className="col-md-5">
                           <select className="form-control"
                                   name="parentId"
                                   onChange={(e) => this.onValueChange(e)}
                           >
                              <option value="0">根品类/</option>
                              {
                                 this.state.categoryList.map((category, index) => {
                                    return <option value={category.id} key={index}>{category.name}</option>
                                 })
                              }
                           </select>
                        </div>
                     </div>

                     {/*品类名称*/}
                     <div className="form-group">
                        <label className="col-md-2 control-label">品类名称</label>
                        <div className="col-md-5">
                           <input type="text"
                                  className="form-control"
                                  placeholder="请输入品类名称"
                                  name="categoryName"
                                  value={this.state.name}
                                  onChange={(e) => this.onValueChange(e)}
                           />
                        </div>
                     </div>

                     {/*提交按钮*/}
                     <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                           <button type="submit"
                                   className="btn btn-primary"
                                   onClick={(e) => {this.onSubmit(e)}}
                           >提交</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}