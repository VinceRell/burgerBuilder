import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";


class Checkout extends Component{
 state={
   ingredients: {
     meat: 1,
     cheese: 1,
     bacon: 1,
     salad: 1
   }
 }

 componentDidMount(){
   const query = new URLSearchParams(this.props.location.search);
   const ingredients = {};
   for(let param of query.entries()){
     ingredients[param[0]] = +param[1];
   }
   this.setState({ingredients: ingredients});
 }

 checkoutCancelHandler = () =>{
  this.props.history.goBack("/");
 }

 checkoutContinueHandler = () =>{
   this.props.history.replace("/checkout/form-data");
 }
 render(){
   return(
     <div>
       <CheckoutSummary
         ingredients={this.state.ingredients}
         checkoutCancelled={this.checkoutCancelHandler}
         checkoutContinued={this.checkoutContinueHandler}
         />
     </div>
   );
 }
}

export default Checkout;