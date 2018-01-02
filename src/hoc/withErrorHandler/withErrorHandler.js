import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrappedElement,axios) =>{
  return class extends Component{
    state = {
      error: null
    }
    componentWillMount(){
      this.reqIntersceptor = axios.interceptors.request.use(req =>{
        this.setState({error: null});
        return req;
      });

      this.resIntersceptor = axios.interceptors.response.use(res => res, error =>{
        this.setState({error: error});
      })
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqIntersceptor);
        axios.interceptors.response.eject(this.resIntersceptor);
    }

    errorConfirmedHandler = () =>{
      this.setState({error: null});
    }

    render(){
      return(
        <Aux>
          <Modal
           modalClosed={this.errorConfirmedHandler}
           show={this.state.error}>
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedElement {...this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
