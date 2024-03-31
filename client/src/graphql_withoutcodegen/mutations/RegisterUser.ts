const RegisterUser=`
mutation register($data: RegisterInput!){
    register(data: $data) {
      id
      email
      name
      role
    }
  }`;
export default RegisterUser;