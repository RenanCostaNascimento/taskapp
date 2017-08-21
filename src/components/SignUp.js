import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { InputGroup, Position, Toaster, Intent, Spinner } from "@blueprintjs/core";
import { validateEmail, showToast, sendEmail } from '../utils'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
                  <InputGroup name="email" leftIconName="envelope" placeholder="Email" onChange={this.handleInputChange}/>
                  <button type="button" className="pt-button pt-intent-primary pt-fill"
                    onClick={() => this.confirmEmail()}>
                    {this.translateText('signup.inscricao')}
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
  * Confirma o e-mail do usuário, se este for válido.
  */
  confirmEmail = () => {
    if (validateEmail(this.state.email)) {
      this.setState({ loading: true });
      var body = {
        template: 'activateAccount',
        params: {
          header: this.translateText('signup.email-cabecalho'),
          iconURL: 'http://cdn.htmlemailtemplates.net/images/activate.png',
          message: this.translateText('signup.email-mensagem'),
          buttonText: this.translateText('signup.email-botao'),
          buttonURL: 'http://sweet-suit.surge.sh/signup-confirmation/' + this.state.email,
          footer: 'footer'
        },
        refferals: {
          to: this.state.email,
          from: 'time-machine@getty.io',
          subject: this.translateText('signup.email-assunto')
        }
      };
      sendEmail(body,
        (res) => {
          this.setState({ loading: false });
          showToast(this.toaster, Intent.SUCCESS, this.translateText('signup.email-enviado'));
        },
        (err) => {
          console.log(err);
          this.setState({ loading: false });
          showToast(this.toaster, Intent.DANGER, this.translateText('signup.erro-inesperado'));
        });
    } else {
      showToast(this.toaster, Intent.DANGER, this.translateText('signup.email-invalido'));
    }
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
