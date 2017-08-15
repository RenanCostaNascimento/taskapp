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
 * @param {string} fullName O nome completo do usuário que será cadastrado.
 * @param {string} userName O nome de usuário do usuário que será cadastrado.
 * @param {string} email O email do usuário que será cadastrado.
 * @param {string} password A senha do usuário que será cadastrado.
 * @param {function} callback Callback de sucesso, quando o cadastro for efetuado.
 * @param {function} errorCallback Callback de erro, quando o cadastro não for efetuado.
 */
export default (fullName, userName, email, password, callback, errorCallback) => {
  const variables = {
    createUserInput: {
      fullName,
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
