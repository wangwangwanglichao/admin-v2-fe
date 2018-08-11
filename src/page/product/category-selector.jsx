/*Category-Selector-Component*/
/*商品分类选择器*/

import React from "react";
/*工具服务文件*/
import Product from "service/product-service.jsx";
import MUtil from "util/mm.jsx";

const _product = new Product();
const _mm = new MUtil();
/*样式文件*/
import './category-selector.scss';

class CategorySelector extends React.Component {
   constructor() {
      super();
      this.state = {
         firstCategoryList: [],
         firstCategoryId: 0,
         secondCategoryList: [],
         secondCategoryId: 0
      }
   }

   /*组件渲染完成之后*/
   componentDidMount() {
      this.loadFirstCategory();
   }

   /*传入的props即将发生改变时*/
   componentWillReceiveProps(nextProps) {
      let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
         parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
      // 数据没有发生变化的时候，直接不做处理
      if (!categoryIdChange && !parentCategoryIdChange) {
         return;
      }
      // 假如只有一级品类
      if (nextProps.parentCategoryId === 0) {
         this.setState({
            firstCategoryId: nextProps.categoryId,
            secondCategoryId: 0
         });
      }
      // 有两级品类
      else {
         this.setState({
            firstCategoryId: nextProps.parentCategoryId,
            secondCategoryId: nextProps.categoryId
         }, () => {
            parentCategoryIdChange && this.loadSecondCategory();
         });
      }
   }

   /*加载一级分类*/
   loadFirstCategory() {
      _product.getCategoryList().then(res => {
         this.setState({
            firstCategoryList: res
         })
      }, err => {
         _mm.errorTips(err);
      })
   }

   /*加载二级分类*/
   loadSecondCategory() {
      _product.getCategoryList(this.state.firstCategoryId).then(res => {
         this.setState({
            secondCategoryList: res
         })
      }, err => {
         _mm.errorTips(err);
      })
   }

   /*选择一级分类,根据一级分类加载二级分类*/
   onFirstCategoryChange(e) {
      if (this.props.readOnly) return;
      let newValue = e.target.value || 0;
      /*第一次选中一级分类后,二级分类已经有值了,需要将二级分类清空*/
      this.setState({
         firstCategoryId: newValue,
         secondCategoryId: 0,
         secondCategoryList: []
      }, () => {
         /*更新二级分类*/
         this.loadSecondCategory();
         this.onPropsCategoryChange();
      });
   }

   /*二级分类发生改变时触发的事件*/
   onSecondCategoryChange(e) {
      if (this.props.readOnly) return;
      let newValue = e.target.value || 0;
      this.setState({
         secondCategoryId: newValue
      }, () => {
         this.onPropsCategoryChange();
      });
   }

   /*传给父组件选中的结果*/
   onPropsCategoryChange() {
      /*判断props里面的回调函数是否存在*/
      let categoryChange = typeof this.props.onCategoryChange === "function";
      if (this.state.secondCategoryId) {
         /*如果有二级品类*/
         categoryChange && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
      } else {
         /*如果只有一级品类*/
         categoryChange && this.props.onCategoryChange(this.state.firstCategoryId, 0);
      }
   }

   /*渲染*/
   render() {
      return (
         <div className="col-md-10">
            <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly={this.props.readOnly}
            >
               <option value="">请选择一级分类</option>
               {
                  this.state.firstCategoryList.map((item, index) => (
                     <option value={item.id} key={index}>{item.name}</option>
                  ))
               }
            </select>
            {
               this.state.secondCategoryList.length
                  ? (
                     <select className="form-control cate-select"
                             value={this.state.secondCategoryId}
                             onChange={(e) => this.onSecondCategoryChange(e)}
                             readOnly={this.props.readOnly}
                     >
                        <option value="">请选择二级分类</option>
                        {
                           this.state.secondCategoryList.map((item, index) => (
                              <option value={item.id} key={index}>{item.name}</option>
                           ))
                        }
                     </select>
                  )
                  : null
            }
         </div>
      )
   }
}

export default CategorySelector;