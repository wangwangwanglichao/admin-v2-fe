import React from "react";
import {Link} from "react-router-dom";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import User from "service/user-service.jsx";
const _user = new User();


export default class NavTop extends React.Component {
   /*构造函数*/
   constructor() {
      super();
      this.state = {
         username: _mm.getStorage("userInfo").username || ""
      }
   }

   /*退出登录*/
   onLogout() {
      _user.logout().then(() => {
         _mm.removeStorage("userInfo");
         // this.props.history.push('/login'); // this.props没传进来,所以会报错;
         window.location.href = "/login";
      }, errMsg => {
         _mm.errorTips(errMsg);
      })
   }

   /*渲染DOM*/
   render() {
      return (
         <div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
               <Link className="navbar-brand" to="/"><b>WANG</b>LICHAO</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
               <li className="dropdown">
                  {/*登录信息*/}
                  <span className="dropdown-toggle">
                     <i className="fa fa-user fa-fw"></i>
                     {
                        this.state.username
                           ?
                           <span>欢迎, {this.state.username}</span>
                           :
                           <span><Link to="/login">请登录</Link></span>
                     }
                     <i className="fa fa-caret-down"></i>
                  </span>
                  {/*退出登录*/}
                  <ul className="dropdown-menu dropdown-user">
                     <li>
                        <a onClick={() => {
                           this.onLogout()
                        }}>
                           <i className="fa fa-sign-out fa-fw"></i>
                           <span>退出登录</span>
                        </a>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      )
   }
}