import { commitMutation, graphql } from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation ConfirmUserEmailMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
  `
/**
 * Mutation para fazer o login do usuário
 * @param {string} email O email do usuário que será usuado para efetuar login.
 * @param {string} password A senha do usuário que será usuada para efetuar login.
 * @param {function} callback Callback de sucesso, quando o login for efetuado.
 * @param {function} errorCallback Callback de erro, quando o login não for efetuado.
 */
export default (id, callback, errorCallback) => {
    const variables = {
        input: {
            id: id,
            isEmailConfirmed: true,
            clientMutationId: ""
        },
    }

    commitMutation(
        environment,
        {
            mutation,
            variables,
            onCompleted: (response) => {
                callback()
            },
            onError: err => {
                errorCallback();
            },
        },
    )
}
