/*Product-Router*/

import React from "react";
import {Switch, Route, Link, Redirect} from "react-router-dom";
/*页面*/
import ProductList from "page/product/index.jsx";
import ProductSave from "page/product/save.jsx";
import CategoryList from "page/product/category/index.jsx";
import ProductDetail from "page/product/detail.jsx";

class ProductRouter extends React.Component {

   render() {
      return (
         <Switch>
            <Route path="/product/index" component={ProductList}/>
            <Route path="/product/save/:pid?" component={ProductSave}/>
            <Route path="/product/detail/:pid" component={ProductDetail}/>
            <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
            <Redirect exact from="/product" to="product/index"/>
            <Redirect exact from="/product-category" to="product-category/index"/>
         </Switch>
      )
   }
}

export default ProductRouter;