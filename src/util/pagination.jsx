/*pagination*/
import React from "react";
import RcPagination from "rc-pagination";
import User from "service/user-service.jsx";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
const _user = new User();
import "rc-pagination/dist/rc-pagination.min.css";

// 通用分页组件:
class Pagination extends React.Component {
   constructor() {
      super();
      this.state = {
         pageNum: 1
      };
   }
   componentDidMount() {
      this.loadUserList();
   }
   loadUserList() {
      _user.getUserList(this.state.pageNum).then(res => {
         this.setState(res)
      }, errMsg => {
         _mm.errorTips(errMsg);
      });
   }
   render() {
      return (
         <div className="row">
            <div className="col-md-12">
               <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
            </div>
         </div>
      )
   }
}

export default Pagination;