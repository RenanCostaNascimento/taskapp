import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'

const mutation = graphql`
  mutation CreateUserMutation($createUserInput: SignupUserInput!, $signinUserInput: SigninUserInput!) {
    createUser(input: $createUserInput) {
      user {
        id
      }
    }

    signinUser(input: $signinUserInput) {
      token
      user {
        id
      }
    }
  }
`
/**
 * Mutation para fazer criar um usuário.
 * @param {string} email O email do usuário que será usuado para efetuar login.
 * @param {string} password A senha do usuário que será usuada para efetuar login.
 * @param {function} callback Callback de sucesso, quando o login for efetuado.
 * @param {function} errorCallback Callback de erro, quando o login não for efetuado.
 */
export default (userName, email, password, callback, errorCallback) => {
  const variables = {
    createUserInput: {
      userName,
      authProvider: {
        email: {
          email,
          password
        }
      },
      clientMutationId: ""
    },
    signinUserInput: {
      email: {
        email,
        password
      },
      clientMutationId: ""
    }
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted: (response) => {
        const id = response.createUser.user.id
        const token = response.signinUser.token
        callback(id, token)
      },
      onError: err => {
        errorCallback();
      },
    },
  )
}
