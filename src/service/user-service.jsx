
import MUtil from "util/mm.jsx";
const _mm = new MUtil();

class User {
   // 用户登录:
   login(loginInfo) {
      return _mm.request({
         type: "post",
         url: "/manage/user/login.do",
         data: loginInfo
      })
   }

   // 检查登录接口的数据是不是合法:
   checkLoginInfo(loginInfo) {
      // 去除账号和密码中的空格:
      let username = $.trim(loginInfo.username),
          password = $.trim(loginInfo.password);
      // 判断账号:
      if (typeof username !== "string" || username.length === 0) {
         return {
            status: false,
            msg: "用户名不能为空!"
         }
      }
      // 判断密码:
      if (typeof password !== "string" || password.length === 0) {
         return {
            status: false,
            msg: "密码不能为空!"
         }
      }
      return {
         status: true,
         msg: "验证通过"
      }
   }

   // 用户退出:
   logout() {
      return _mm.request({
         type: "post",
         url: "/user/logout.do"
      });
   }

   // 获取用户列表数据:
   getUserList(pageNum) {
      return _mm.request({
         type: "post",
         url: "/manage/user/list.do",
         data: {
            pageNum
         }
      });
   }
}

export default User;