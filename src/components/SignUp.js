import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { InputGroup, Position, Toaster, Intent } from "@blueprintjs/core";
import { validateEmail, showToast, sendEmail } from '../utils'

class SignUp extends Component {
  toaster: Toaster;
  refHandlers = {
    toaster: (ref: Toaster) => this.toaster = ref,
  };
  state = {
    email: '',
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
                  <button type="button" className="pt-button pt-intent-primary pt-fill"
                    onClick={() => this.confirmEmail()}>
                    <FormattedMessage id="signup.inscricao" />
                  </button>
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
      </div>
    )
  }

  /**
  * Confirma o e-mail do usuário, se este for válido.
  */
  confirmEmail = () => {
    if (validateEmail(this.state.email)) {
      var body = {
        template: 'activateAccount',
        params: {
          header: this.context.intl.formatMessage({id: 'signup.email-cabecalho' }),
          iconURL: 'http://cdn.htmlemailtemplates.net/images/activate.png',
          message: this.context.intl.formatMessage({id: 'signup.email-mensagem' }),
          buttonText: this.context.intl.formatMessage({id: 'signup.email-botao' }),
          buttonURL: 'http://sweet-suit.surge.sh/signup-confirmation/' + this.state.email,
          footer: 'footer'
        },
        refferals: {
          to: this.state.email,
          from: 'time-machine@getty.io',
          subject: this.context.intl.formatMessage({id: 'signup.email-assunto' })
        }
      };
      sendEmail(body,
        (res) => {
          showToast(this.toaster, Intent.SUCCESS, this.context.intl.formatMessage({id: 'signup.email-enviado' }));
        },
        (err) => {
          console.log(err);
          showToast(this.toaster, Intent.DANGER, this.context.intl.formatMessage({id: 'signup.erro-inesperado' }));
        });
    } else {
      showToast(this.toaster, Intent.DANGER, this.context.intl.formatMessage({id: 'signup.email-invalido' }));
    }
  }
}

SignUp.contextTypes = {
  intl: PropTypes.object.isRequired
};

export default SignUp
