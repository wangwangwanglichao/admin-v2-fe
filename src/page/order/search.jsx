/*Search-Component*/
/*order页面的搜索组件*/

import React from "react";

export default class Search extends React.Component {
   constructor() {
      super();
      this.state = {
         orderNumber: ""
      }
   }
   // 当输入框内容发生改变时触发的方法
   onValueChange(e) {
      let name = e.target.name,
         value = e.target.value.trim();
      this.setState({
         [name]: value
      });
   }
   // 点击搜索按钮的时候触发的方法
   onSearch() {
      this.props.onSearch(this.state.orderNumber);
   }
   // 按回车提交
   onSearchKeywordKeyUp(e) {
      if (e.keyCode === 13) {
         this.onSearch();
      }
   }
   render() {
      return (
         <div className="row search-wrap">
            <div className="col-md-12">
               <div className="form-inline">
                  <div className="form-group">
                     <select className="form-control">
                        <option value="">按订单号查询</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <input type="text"
                            className="form-control"
                            placeholder="请输入订单号"
                            name="orderNumber"
                            onKeyUp={(e)=>this.onSearchKeywordKeyUp(e)}
                            onChange={(e)=>this.onValueChange(e)}
                     />
                  </div>
                  <button className="btn btn-primary"
                          onClick={()=>this.onSearch()}
                  >搜索</button>
               </div>
            </div>
         </div>
      )
   }
}