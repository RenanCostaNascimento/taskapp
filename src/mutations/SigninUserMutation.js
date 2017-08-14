import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation SigninUserMutation($input: SigninUserInput!) {
    signinUser(input: $input) {
      token
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
export default (email, password, callback, errorCallback) => {
  const variables = {
    input: {
      email: {
        email,
        password
      },
      clientMutationId: ""
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        const id = response.signinUser.user.id
        const token = response.signinUser.token
        callback(id, token)
      },
      onError: err => {
        errorCallback();
      },
    },
  )
}
