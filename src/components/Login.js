import React, { Component } from 'react'
import PropTypes from 'prop-types';
import SigninUserMutation from '../mutations/SigninUserMutation'
import { InputGroup, Position, Toaster, Intent, Spinner } from "@blueprintjs/core";
import { showToast, saveUserData } from '../utils'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  toaster: Toaster;
  refHandlers = {
    toaster: (ref: Toaster) => this.toaster = ref,
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
                  <InputGroup name="email" leftIconName="envelope" placeholder="Email" onChange={this.handleInputChange} />
                  <InputGroup name="password" type="password" leftIconName="lock" placeholder={this.translateText('login.senha')}
                    onChange={this.handleInputChange} />
                  <button type="button" className="pt-button pt-intent-primary pt-fill" onClick={() => this.validateUserInfo()}>
                    {this.translateText('login.entrar')}
                  </button>
                  <br /><br />
                  {this.translateText('comum.ou')}
                  <br /><br />
                  <a onClick={() => this.navigateToUrl('signup')}>{this.translateText('login.criar-conta')}</a>
                </div>
                {this.showLoading()}
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
    this.state.email && this.state.password ? this.login() : showToast(this.toaster, Intent.DANGER, this.translateText('login.preencher-formulario'));
  }

  /**
  * Tenta fazer o login do usuário.
  */
  login = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    SigninUserMutation(email, password, (id, token) => {
      this.setState({ loading: false });
      saveUserData(id, token);
      showToast(this.toaster, Intent.SUCCESS, this.translateText('login.sucesso'));
    }, () => {
      this.setState({ loading: false });
      showToast(this.toaster, Intent.DANGER, this.translateText('login.falha'));
    });
  }

  /**
   * Atualiza o state conforme interação do usuário.
   * @param event O evento de mudança que foi disparado.
   */
  handleInputChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  /**
   * Verifica se deve ou não mostrar o componente de loading.
   */
  showLoading() {
    if (this.state.loading) {
      return <Spinner className="pt-intent-primary pt-small" />;
    }
  }

  /**
     * Traduz um texto usando i18n.
     * @param {string} text O identificador do texto que deve ser traduzido.
     */
    translateText(text: string) {
      return this.context.intl.formatMessage({ id: text });
    }

  /**
   * Navega para a URL especificada.
   * @param {string} url A url para a qual se dejesa navegar.
   */
  navigateToUrl(url: string) {
    this.props.history.push('/' + url);
  }

}

Login.contextTypes = {
  intl: PropTypes.object.isRequired
};

export default Login
