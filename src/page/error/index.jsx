// Error Component
import React from "react";
import {Link} from "react-router-dom";
import PageTitle from "component/page-title/index.jsx";


export default class Error extends React.Component {
   constructor() {
      super();
   }
   render() {
      return (
         <div id="page-wrapper">
            <PageTitle title="出错啦!"/>
            <div className="row">
               <div className="col-md-12">
                  <p className="error">您要访问的页面去火星啦!!!</p>
                  <Link to="/">点我返回首页</Link>
               </div>
            </div>
         </div>
      )
   }
}