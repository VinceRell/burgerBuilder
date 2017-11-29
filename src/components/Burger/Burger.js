import React from "react";
import classes from "./Burger.css";

//components
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";


const Burger = (props) =>{
  const recipe = Object.keys(props.ingredients).map((val)=>{
    return [...Array(props.ingredients[val])].map((_,i)=>{
      return <BurgerIngredients key={val + i} type={val} />
    });
  });

  return(
    <div className={classes.burger}>
      <BurgerIngredients type="bread-top"/>
      {recipe}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  );
}

export default Burger;
