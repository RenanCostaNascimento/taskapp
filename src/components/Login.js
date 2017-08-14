import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import SigninUserMutation from '../mutations/SigninUserMutation'
import { InputGroup, Position, Toaster, Intent } from "@blueprintjs/core";
import { showToast, saveUserData } from '../utils'

class Login extends Component {
  toaster: Toaster;
  refHandlers = {
    toaster: (ref: Toaster) => this.toaster = ref,
  };
  state = {
    email: '',
    password: ''
  };

  render() {
    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="row center-xs">
              <Toaster position={Position.BOTTOM_RIGHT} ref={this.refHandlers.toaster} />
              <h2 className="title">taskapp</h2>
              <div className="col-lg-2 col-sm-4 col-md-4 col-xs-4">
                <div className="col-xs-12">
                  <InputGroup leftIconName="envelope" placeholder="Email"
                    onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} />
                  <InputGroup leftIconName="lock" placeholder={this.context.intl.formatMessage({id: 'login.senha' })} type="password"
                    onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password} />
                  <button type="button" className="pt-button pt-intent-primary pt-fill" onClick={() => this.validateUserInfo()}>
                    <FormattedMessage id="login.entrar" />
                  </button>
                  <br /><br />
                  <FormattedMessage id="comum.ou" />
                  <br /><br />
                  <a onClick={() => this.props.history.push(`/signup`)}><FormattedMessage id="login.criar-conta" /></a>
                </div>
              </div>
              <div className="footer">
                <div className="footer-text">
                  Powered by
                </div>
                <div className="footer-brand">
                  <a href="https://getty.io/br/home.html" target="_blank" rel="noopener noreferrer">GETTY/IO Inc.</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }

  /**
  * Valida os dados do usuário antes do login.
  * @return {[type]} [description]
  */
  validateUserInfo() {
    this.state.email && this.state.password ? this.login() : showToast(this.toaster, Intent.DANGER, this.context.intl.formatMessage({id: 'login.preencher-formulario' }));
  }

  /**
  * Tenta fazer o login do usuário.
  */
  login = () => {
    const { email, password } = this.state;
    SigninUserMutation(email, password, (id, token) => {
      saveUserData(id, token);
      showToast(this.toaster, Intent.SUCCESS, this.context.intl.formatMessage({id: 'login.sucesso' }));
    }, () => {
      showToast(this.toaster, Intent.DANGER, this.context.intl.formatMessage({id: 'login.falha' }));
    });
  }

}

Login.contextTypes = {
  intl: PropTypes.object.isRequired
};

export default Login
