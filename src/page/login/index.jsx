// Login Component
import React from "react";
import "./index.scss";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import User from "service/user-service.jsx";
const _user = new User();

export default class Login extends React.Component {
   // 构造函数
   constructor() {
      super();
      this.state = {
         username: "",
         password: "",
         redirect: _mm.getUrlParam("redirect") || "/"
      };
   }

   // 组件渲染之前:
   componentWillMount() {
      document.title = "登录 - 后台管理系统";
   }

   // 账号或密码发生改变:
   onInputChange(e) {
      let inputName = e.target.name,
          inputValue = e.target.value;
      this.setState({
         [inputName] : inputValue
      });
   }

   // 提交表单:
   onSubmit() {
      let loginInfo = {
         username: this.state.username,
         password: this.state.password
      },
      checkResult = _user.checkLoginInfo(loginInfo);
      // 验证通过:
      if (checkResult.status) {
         _user.login(loginInfo).then(res => {
            _mm.setStorage("userInfo", res);
            this.props.history.push(this.state.redirect);
         }, errMsg => {
            _mm.errorTips(errMsg);
         })
      } else {
         // 验证未通过:
         _mm.errorTips(checkResult.msg);
      }

   }

   // 回车提交:
   onInputKeyUp(e) {
      if (e.keyCode === 13) {
         this.onSubmit();
      }
   }

   // 渲染DOM:
   render() {
      return (
         <div>
            <div className="col-md-4 col-md-offset-4">
               <div className="panel panel-default login-panel">
                  <div className="panel-heading">欢迎登录 - 后台管理系统</div>
                  <div className="panel-body">
                     <div>
                        <div className="form-group">
                           <input
                              type="text"
                              name="username"
                              className="form-control"
                              placeholder="请输入账号"
                              onChange={e=>this.onInputChange(e)}
                              onKeyUp={e => this.onInputKeyUp(e)}
                           />
                        </div>
                        <div className="form-group">
                           <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="请输入密码"
                              onChange={e=>this.onInputChange(e)}
                              onKeyUp={e => this.onInputKeyUp(e)}
                           />
                        </div>
                        <button
                           className="btn btn-lg btn-block btn-primary"
                           onClick={e=>{this.onSubmit(e)}}>
                           登录
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}