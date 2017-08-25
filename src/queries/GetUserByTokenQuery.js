import { graphql } from 'react-relay'

export default graphql`
query GetUserByTokenQuery($token: String) {
  viewer {
    User(emailConfirmationToken: $token) {
      userName
      id
    }
  }
}
`