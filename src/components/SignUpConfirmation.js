import React, { Component } from 'react'
import CreateUserMutation from '../mutations/CreateUserMutation'
import { InputGroup, Position, Toaster, Intent } from "@blueprintjs/core";
import { validateEmail, showToast, saveUserData, sendEmail } from '../utils'

class SignUpConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: this.props.match.params.email,
      password: '',
      passwordConfirmation: ''
    };
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
                  <InputGroup leftIconName="user" placeholder="User Name"
                  onChange={(e) => this.setState({ name: e.target.value })} value={this.state.name}/>
                  <InputGroup leftIconName="lock" placeholder="Type your password" type="password"
                  onChange={(e) => this.setState({ password: e.target.value })} value={this.state.password}/>
                  <InputGroup leftIconName="lock" placeholder="Confirm your password" type="password"
                  onChange={(e) => this.setState({ passwordConfirmation: e.target.value })} value={this.state.passwordConfirmation}/>
                  <button type="button" className="pt-button pt-intent-primary pt-fill"
                  onClick={() => this.validateUserInfo()}>
                    Create Account
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
   * Valida as informações do usuário: e-mail e senha.
   */
  validateUserInfo(){
    if(this.state.name){
      if(validateEmail(this.state.email)){
        if(this.validatePassword(this.state.password) && this.state.password === this.state.passwordConfirmation){
          this.createAccount();
        }else{
          showToast(this.toaster, Intent.DANGER, 'Invalid Password');
        }
      }else{
        showToast(this.toaster, Intent.DANGER, 'Invalid E-mail');
      }
    }else{
      showToast(this.toaster, Intent.DANGER, 'Please fill in your name, sir.');
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
    const { name, email, password } = this.state
    CreateUserMutation(name, email, password, (id, token) => {
      saveUserData(id, token);
      var onDismiss = () => {
        this.props.history.push(`/`);
      }
      this.sendThankYouEmail();
      showToast(this.toaster, Intent.SUCCESS, 'Account created with success! We will redirect you to login.', onDismiss);
    }, (errorMessage) => {
      showToast(this.toaster, Intent.DANGER, errorMessage);
    });
  }

  /**
  * Enviar um e-mail de boas vindas ao usuário.
  */
  sendThankYouEmail = () => {
    var body = {
      template: 'registrationThanks',
      params: {
        header: 'Welcome',
        iconURL: 'http://cdn.htmlemailtemplates.net/images/ok.png',
        helloMessage: 'Hello ' + this.state.name,
        firstParagraph: 'Thanks for joining. We are really excited to have you on board.',
        secondParagraph: '10,000+ businesses worldwide use Startup Email Templates to stay connected with their customers.',
        buttonMessage: 'LOGIN TO YOUR ACCOUNT',
        buttonURL: 'http://www.google.com',
        questionText: 'Have a question?',
        knowledgeBaseMessage: 'For a quick answer, check our',
        knowledgeBaseURL: 'http://www.google.com',
        knowledgeBaseURLText: 'Knowledge Base.',
        footer: 'footer'
      },
      refferals: {
        to: this.state.email,
        from: 'time-machine@getty.io',
        subject: 'E-mail Confirmation'
      }
    };
    sendEmail(body, (res) => {}, (err) => {});
  }

}

export default SignUpConfirmation
