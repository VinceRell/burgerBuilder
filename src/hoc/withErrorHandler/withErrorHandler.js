import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        _isMounted = false;

        state = {
            error: null
        }



        resInterceptor = () => {
            this._isMounted = true;
            axios.interceptors.request.use(req => {
                if(this._isMounted) {
                    this.setState({error: null});
                    return req;
                }
            });
        }

        reqInterceptor = () => {
            this._isMounted = true;
            axios.interceptors.response.use(res => res, err => {
              if(this._isMounted) {
                this.setState({error: err});
              }
            });
        }
    

        componentWillUnmount() {
           this._isMounted = false;
           axios.interceptors.response.eject(this.resInterceptor);
           axios.interceptors.request.eject(this.reqInterceptor);
        }

        confirmErrorHandler = () => {
            this.setState({error: null});
        }

        render() {

            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        cancelHandler={this.confirmErrorHandler}>
                      {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;