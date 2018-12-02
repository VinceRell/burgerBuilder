import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        resInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

        reqInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            });
    

        componentWillUnmount() {
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