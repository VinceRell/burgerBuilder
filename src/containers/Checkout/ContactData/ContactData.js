import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';


import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {},
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            burger: this.props.ingredients,
            price: this.props.price
        };

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false});
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false});
            });
    }
   
     render() {
         let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="street name"/>
                <Input inputtype="input" type="text" name="zipcode" placeholder="zipcode"/>
                <Button BtnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
         );
         if(this.state.loading) {
             form = <Spinner />
         }

         return (
             <section className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
             </section>
         );
     }

}


export default ContactData;