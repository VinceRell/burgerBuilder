import React from "react";

import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";


const Burger = (props) =>{
  let recipe = Object.keys(props.ingredients).map((val)=>{
    return [...Array(props.ingredients[val])].map((_,i)=>{
      return <BurgerIngredients key={val + i} type={val} />
    });
  }).reduce((arr,val)=>{
    return arr.concat(val);
  },[]);

  if(recipe.length === 0){
    recipe = <p>Customize your burger</p>
  }

  return(
    <div className={classes.burger}>
      <BurgerIngredients type="bread-top"/>
      {recipe}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  );
}

export default Burger;
