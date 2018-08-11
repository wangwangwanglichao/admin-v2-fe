// user Component
import React from "react";
import {Link} from "react-router-dom";
import User from "service/user-service.jsx";
const _user = new User();
import MUtil from "util/mm.jsx";
const _mm = new MUtil();

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination.jsx";
import TableList from "util/table-list.jsx";


export default class UserList extends React.Component {
   constructor() {
      super();
      this.state = {
         list: [],
         pageNum: 1
      };
   }
   // 组件加载之后
   componentDidMount() {
      this.loadUserList();
   }
   // 加载用户列表的方法
   loadUserList() {
      _user.getUserList(this.state.pageNum).then(res => {
         this.setState(res);
      }, errMsg => {
         this.setState({
            list: []
         });
         _mm.errorTips(errMsg);
      });
   }
   // 页数发生变化时重新加载用户列表的方法:
   onPageNumChange(pageNum) {
      this.setState({
         pageNum: pageNum
      }, () => {
         this.loadUserList();
      });
   }
   // 渲染
   render() {
      return (
         <div id="page-wrapper">
            <PageTitle title="用户列表"/>
            <TableList tableHeads={["ID", "用户", "邮箱", "电话", "注册时间"]}>
               {
                  this.state.list.map((item, index) => {
                     return (
                        <tr key={index}>
                           <td>{item.id}</td>
                           <td>{item.username}</td>
                           <td>{item.email}</td>
                           <td>{item.phone}</td>
                           <td>{new Date(item.createTime).toLocaleString()}</td>
                        </tr>
                     )
                  })
               }
            </TableList>
            <Pagination
               current={this.state.pageNum}
               total={this.state.total}
               onChange={(pageNum) => {
                  this.onPageNumChange(pageNum);
            }}/>
         </div>
      )
   }
}