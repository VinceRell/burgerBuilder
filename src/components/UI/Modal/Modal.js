import React from "react";

//styles
import classes from "./Modal.css";

//components
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";


const Modal = (props)=>(
  <Aux>
     <Backdrop show={props.show} cancel={props.modalClosed}/>
     <div className={classes.Modal}
          style={{
            transform: props.show ? "translateY(0)" : "TranslateY(-100vh)",
            opacity: props.show ? "1" : "0"
          }}>
        {props.children}
    </div>
  </Aux>
);

export default Modal;
