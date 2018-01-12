import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";

class Contactdata extends Component{
  render(){
   return(
    <div>
      <form action="">
        <input type="text" name="firstname" placeholder="firstname"/>
        <input type="text" name="lastname" placeholder="lastname"/>
        <input type="email" name="email" placeholder="email"/>
        <input type="text" name="street" placeholder="street"/>
        <Button btnType="Success">SUBMIT</Button>
      </form>
    </div>
   );
  }
}

export default ContactData;
