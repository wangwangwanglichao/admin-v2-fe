/*Product-Detail-Component*/
import React from "react";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import Product from "service/product-service.jsx";
const _product = new Product();
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
// 导入样式
import "./save.scss";

export default class ProductDetail extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: this.props.match.params.pid,
         name: "",
         subtitle: "",
         categoryId: 0,
         parentCategoryId: 0,
         subImages: [],
         price: "",
         stock: "",
         detail: "",
         status: 1
      };
   }

   componentDidMount() {
      this.loadProduct();
   }

   // 加载商品详情信息
   loadProduct() {
      if(this.state.id) {
         // 有id的时候,表示是编辑功能,需要表单回填
         _product.getProduct(this.state.id).then(res => {
            let images = res.subImages.split(",");
            res.subImages = images.map(imgUri => {
               return {
                  uri: imgUri,
                  url: res.imageHost + imgUri
               }
            });
            this.setState(res);
         }, err => {
            _mm.errorTips(err);
         })
      }
   }

   render() {
      return (
         <div id="page-wrapper">
            <PageTitle title="添加商品"/>
            <div className="form-horizontal">
               {/*商品名称*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品名称</label>
                  <div className="col-md-5">
                     <p className="form-control-static">{this.state.name}</p>
                  </div>
               </div>
               {/*商品描述*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品描述</label>
                  <div className="col-md-5">
                     <p className="form-control-static">{this.state.subtitle}</p>
                  </div>
               </div>
               {/*所属分类*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">所属分类</label>
                  <CategorySelector
                     readOnly
                     categoryId={this.state.categoryId}
                     parentCategoryId={this.state.parentCategoryId}
                  />
               </div>
               {/*商品价格*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品价格</label>
                  <div className="col-md-3">
                     <div className="input-group">
                        <input
                           type="number"
                           className="form-control"
                           value={this.state.price}
                           readOnly
                        />
                        <span className="input-group-addon">元</span>
                     </div>
                  </div>
               </div>
               {/*商品库存*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品库存</label>
                  <div className="col-md-3">
                     <div className="input-group">
                        <input
                           type="number"
                           className="form-control"
                           value={this.state.stock}
                           readOnly
                        />
                        <span className="input-group-addon">件</span>
                     </div>
                  </div>
               </div>
               {/*商品图片*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品图片</label>
                  <div className="col-md-10">
                     {
                        this.state.subImages.length
                            ?
                           this.state.subImages.map((image, index) => (
                              <div className="img-con"
                                   key={index}
                              >
                                 <img src={image.url} className="img"/>
                              </div>
                           ))
                           :
                           (<div>暂无图片</div>)
                     }
                  </div>
               </div>
               {/*商品详情*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品详情</label>
                  <div className="col-ma-10"
                       dangerouslySetInnerHTML={{__html: this.state.detail}}
                  >{/*此处不能有空格*/}</div>
               </div>
            </div>
         </div>
      )
   }
}