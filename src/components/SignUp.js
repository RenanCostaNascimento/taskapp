import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CreateUserMutation from '../mutations/CreateUserMutation'
import { InputGroup, Position, Toaster, Intent, Spinner } from "@blueprintjs/core";
import { validateEmail, showToast } from '../utils'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
                  <InputGroup name="fullName" leftIconName="user" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup.nome-completo')} />
                  <InputGroup name="userName" leftIconName="user" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup.nome-usuario')} />
                  <InputGroup name="password" type="password" leftIconName="lock" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup.digitar-senha')} />
                  <InputGroup name="passwordConfirmation" type="password" leftIconName="lock" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup.confirmar-senha')} />
                  <button type="button" className="pt-button pt-intent-primary pt-fill" onClick={() => this.validateUserInfo()}>
                    {this.translateText('signup.criar-conta')}
                  </button>
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
      </div>
    )
  }

  /**
   * Valida as informações do usuário: e-mail e senha.
   */
  validateUserInfo() {
    if (validateEmail(this.state.email)) {
      if (this.state.fullName && this.state.userName) {
        if (this.validatePassword(this.state.password) && this.state.password === this.state.passwordConfirmation) {
          this.createAccount();
        } else {
          showToast(this.toaster, Intent.DANGER, this.translateText('signup.senha-invalida'));
        }
      } else {
        showToast(this.toaster, Intent.DANGER, this.translateText('signup.preencher-nome'));
      }
    } else {
      showToast(this.toaster, Intent.DANGER, this.translateText('signup.email-invalido'));
    }
  }

  /**
  * Verifica se uma senha é válida, segundo os critérios de segurança:
  * - ter no mínimo 6 caracteres.
  * @param  {string} password  A senha que será validada.
  * @return {boolean}          Retorna true se a senha for válida.
  */
  validatePassword(password) {
    return password && password.length >= 6;
  }

  /**
  * Tenta criar a conta do usuário;
  */
  createAccount = () => {
    this.setState({ loading: true });
    const { fullName, userName, email, password } = this.state;
    CreateUserMutation(fullName, userName, email, password,
      () => {
        this.setState({ loading: false });
        var onDismiss = () => {
          this.props.history.push(`/`);
        }
        showToast(this.toaster, Intent.SUCCESS, this.translateText('signup.conta-criada'), onDismiss);
      },
      () => {
        this.setState({ loading: false });
        showToast(this.toaster, Intent.DANGER, this.translateText('signup.usuario-existente'));
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
}

SignUp.contextTypes = {
  intl: PropTypes.object.isRequired
};

export default SignUp
