import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect,withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, message } from 'antd';
import { withApollo } from 'react-apollo';
import TransitionAnimation from '../../component/util/transition';

import { actions as authActions, getLoggedUser } from "../../../_service/reduxstore/modules/auth";

import './index.scss';


const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientinfo  : {},
      redirectToReferrer: false,
      userid: '',
      password: ''
    };
    this.inputRef = React.createRef();
  }



  static getDerivedStateFromProps(nextProps,prevState) {
    //console.log('LOGIN:GET-Derived:',nextProps.user.get("uid"));
    if ( (!prevState.redirectToReferrer) && (nextProps.user.get("uid")) ) {
      return {
        redirectToReferrer : true
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleUseridInput = (e) => {
    this.setState({userid: e.target.value});
  };

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  };


  handleSubmit = (e) => {
    e.preventDefault();
     // 如果当前已有用户登录，先注销
     if (this.props.user.get("uid")) {
      this.props.requestlogout(this.props.user.get("token"));
    }
    this.props.login(this.state.userid, this.state.password);
  }
  

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
        <TransitionAnimation>
        <div className="loginDIV">
            <div className="loginform">
           <p/>
                <h1>Go Web</h1>
                <form onSubmit={this.handleSubmit}>
                  <input className="login-input" type="text" value={this.state.userid}
                      onChange={this.handleUseridInput} placeholder="Username / Email / Phone" required="required" ref={this.inputRef} />
                  <input className="login-input" type="password" value={this.state.password}
                       onChange={this.handlePasswordInput} placeholder="Password" required="required"/>
                  <button className="btn btn-primary btn-block btn-large"  type="submit" >  Login </button>
                </form>
            </div>
        </div>
        </TransitionAnimation>
    );
  }
}

const WrappedLoginForm = Form.create()(withRouter(LoginForm));


const mapStateToProps = (state, props) => {
    return {
      user: getLoggedUser(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      ...bindActionCreators(authActions, dispatch)
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(withApollo(WrappedLoginForm));

