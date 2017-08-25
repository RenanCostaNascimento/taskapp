import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { QueryRenderer } from 'react-relay'
import ConfirmUserEmailMutation from '../mutations/ConfirmUserEmailMutation'
import GetUserByTokenQuery from '../queries/GetUserByTokenQuery'
import { Spinner } from "@blueprintjs/core";
import environment from '../Environment'

class SignUpConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token
    };
    this.confirmUser = this.confirmUser.bind(this);
  }

  render() {
    return (
      <div>
        <QueryRenderer
          environment={environment}
          query={GetUserByTokenQuery}
          variables={{ token: this.state.token }}
          render={this.confirmationInterface}
        />
      </div>
    )
  }

  /**
   * Retorna a interface da tela atual para o QueryRenderer.
   */
  confirmationInterface = ({ error, props }) => {
    if (error) {
      return (
        <div>
          <h1>{this.translateText("signup-confirmation.token-invalido")}</h1>
        </div>
      )
    } else if (props) {
      this.confirmUser(props.viewer.User.id);
      return (
        <div>
          <h1>{this.translateText("signup-confirmation.email-confirmado")}</h1>
          <br />
          <h3>{this.translateText("signup-confirmation.cadastro-completo")}
            <a onClick={() => this.navigateToUrl('')}>{this.translateText("signup-confirmation.efetuar-login")}</a>
          </h3>
        </div>
      )
    }
    return (
      <div>
        <h1>{this.translateText("signup-confirmation.validando-email")}</h1>
        <Spinner className="pt-intent-primary pt-small" />
      </div>
    )
  };

  /**
   * Confirma o usuário no banco, usando o ID do mesmo.
   * @param {string} id O ID do usuário que se deseja confirmar.
   */
  confirmUser(id: string) {
    ConfirmUserEmailMutation(id,
      () => { },
      () => { });
  }

  /**
   * Navega para a URL especificada.
   * @param {string} url A url para a qual se dejesa navegar.
   */
  navigateToUrl(url: string) {
    this.props.history.push('/' + url);
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