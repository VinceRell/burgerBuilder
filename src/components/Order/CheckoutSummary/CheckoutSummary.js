import React from 'react';
import classes from './CheckoutSummary.module.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {

    return (
        <section className={classes.CheckoutSummary}>
            <h1>Your Order</h1>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger Ingredients={props.ingredients}/>
            </div>
            <Button BtnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button BtnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </section>
    );
}

export default checkoutSummary;