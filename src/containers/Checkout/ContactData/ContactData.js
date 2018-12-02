import React, { Component } from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';


import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';

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
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="street name"/>
                <input className={classes.Input} type="text" name="zipcode" placeholder="zipcode"/>
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