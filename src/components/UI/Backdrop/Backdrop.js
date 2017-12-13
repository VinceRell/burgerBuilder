import React from "react";

//styles
import classes from "./Backdrop.css";

const Backdrop = (props) =>(
  props.show ? <div className={classes.Backdrop} onClick={props.cancel}></div> : null
);

export default Backdrop;
