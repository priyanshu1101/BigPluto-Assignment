const LoginUser=`
mutation loginUser($password: String!, $email: String!){
    login(password: $password, email: $email) {
    id
    firstName
    lastName
    name
  }
}`;
export default LoginUser;