import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';


import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zipcode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            burger: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Vincent Rellum",
                address: {
                    street: "someStreet 23",
                    zipcode: "1235CD",
                    country: "Netherlands"
                },
                phoneNumber: "1123354458",
            },
            deliveryStatus: "ASAP"
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
                <Input inputType="input" name="name" placeholder="Your name"/>
                <Input inputType="input" name="email" placeholder="Your email"/>
                <Input inputType="input" name="street" placeholder="street name"/>
                <Input inputType="input" name="zipcode" placeholder="zipcode"/>
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