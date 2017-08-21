import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CreateUserMutation from '../mutations/CreateUserMutation'
import { InputGroup, Position, Toaster, Intent, Spinner } from "@blueprintjs/core";
import { validateEmail, showToast, saveUserData, sendEmail } from '../utils'

class SignUpConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      email: this.props.match.params.email,
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
                  <InputGroup name="fullName" leftIconName="user" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup-confirmation.nome-completo')} />
                  <InputGroup name="userName" leftIconName="user" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup-confirmation.nome-usuario')} />
                  <InputGroup name="password" type="password" leftIconName="lock" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup-confirmation.digitar-senha')} />
                  <InputGroup name="passwordConfirmation" type="password" leftIconName="lock" onChange={this.handleInputChange}
                    placeholder={this.translateText('signup-confirmation.confirmar-senha')} />
                  <button type="button" className="pt-button pt-intent-primary pt-fill"
                    onClick={() => this.validateUserInfo()}>
                    {this.translateText('signup-confirmation.criar-conta')}
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
    if (this.state.fullName && this.state.userName) {
      if (validateEmail(this.state.email)) {
        if (this.validatePassword(this.state.password) && this.state.password === this.state.passwordConfirmation) {
          this.createAccount();
        } else {
          showToast(this.toaster, Intent.DANGER, this.translateText('signup-confirmation.senha-invalida'));
        }
      } else {
        showToast(this.toaster, Intent.DANGER, this.translateText('signup-confirmation.email-invalida'));
      }
    } else {
      showToast(this.toaster, Intent.DANGER, this.translateText('signup-confirmation.preencher-nome'));
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
    const { fullName, userName, email, password } = this.state
    CreateUserMutation(fullName, userName, email, password, (id, token) => {
      saveUserData(id, token);
      this.setState({ loading: false });
      var onDismiss = () => {
        this.props.history.push(`/`);
      }
      this.sendThankYouEmail();
      showToast(this.toaster, Intent.SUCCESS, this.translateText('signup-confirmation.conta-criada'), onDismiss);
    }, (errorMessage) => {
      this.setState({ loading: false });
      showToast(this.toaster, Intent.DANGER, this.translateText('signup-confirmation.usuario-existente'));
    });
  }

  /**
  * Enviar um e-mail de boas vindas ao usuário.
  */
  sendThankYouEmail = () => {
    var body = {
      template: 'registrationThanks',
      params: {
        header: this.translateText('signup-confirmation.email-cabecalho'),
        iconURL: 'http://cdn.htmlemailtemplates.net/images/ok.png',
        helloMessage: this.translateText('signup-confirmation.email-mensagem-alo') + this.state.userName,
        firstParagraph: this.translateText('signup-confirmation.email-primeiro-paragrafo'),
        secondParagraph: this.translateText('signup-confirmation.email-segundo-paragrafo'),
        buttonMessage: this.translateText('signup-confirmation.email-botao'),
        buttonURL: 'http://www.google.com',
        questionText: this.translateText('signup-confirmation.email-pergunta'),
        knowledgeBaseMessage: this.translateText('signup-confirmation.email-mensagem-conhecimento'),
        knowledgeBaseURL: 'http://www.google.com',
        knowledgeBaseURLText: this.translateText('signup-confirmation.email-texto-conhecimento'),
        footer: 'footer'
      },
      refferals: {
        to: this.state.email,
        from: 'time-machine@getty.io',
        subject: this.translateText('signup-confirmation.email-assunto')
      }
    };
    sendEmail(body, (res) => { }, (err) => { });
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

SignUpConfirmation.contextTypes = {
  intl: PropTypes.object.isRequired
};

export default SignUpConfirmation