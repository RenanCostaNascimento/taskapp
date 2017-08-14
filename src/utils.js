import { GC_USER_ID, GC_AUTH_TOKEN } from './constants'
import Request from "superagent";

/**
* Verifica se um e-mail é válido.
* @param  {string}   email O e-mail que se deseja verificar a validade.
* @return {boolean}  Retorna true se o e-mail for válido.
*/
export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

/**
* Mostra um Toast do blueprintjs.
* @param  {Toaster}   toaster     O Toaster que exibirá a mensagem.
* @param  {Intent}    intent      O tipo de toast que será mostrado.
* @param  {string}    message     A mensagem que será exibida.
* @param  {function}  onDismiss   Função que será chamada quando o toast desaparecer.
*/
export function showToast(toaster, intent, message, onDismiss){
  toaster.show({ intent: intent, message: message, onDismiss: onDismiss });
}

/**
* Salva o Id e Token de acesso do usuário no localStorage
* @param  {string} id    O Id do usuário que se deseja salvar.
* @param  {string} token O token de acesso do usuário que se deseja salvar.
*/
export function saveUserData(id, token) {
  localStorage.setItem(GC_USER_ID, id)
  localStorage.setItem(GC_AUTH_TOKEN, token)
}

/**
* Envia um e-mail usando a API de e-mail da Getty/IO.
* @param  {object}   body           O corpo do e-mail.
* @param  {function} callback       Callback de sucesso.
* @param  {function} errorCallback  Callback de erro.
*/
export function sendEmail(body, callback, errorCallback){
  Request
  .post('https://5rim7x5u16.execute-api.us-east-1.amazonaws.com/dev/send/mail')
  .send(body)
  .set('X-Api-Key', 'Gy1EW0QJ0w3ANTkhFAx7KEP5aOIe2S331HtYiHEj')
  .set('Content-Type', 'application/json')
  .end((err, res) => {
    if(err){
      errorCallback(err);
    } else {
      callback(res);
    }
  });
}

export function flattenMessages(nestedMessages, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
      let value       = nestedMessages[key];
      let prefixedKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
          messages[prefixedKey] = value;
      } else {
          Object.assign(messages, flattenMessages(value, prefixedKey));
      }

      return messages;
  }, {});
}