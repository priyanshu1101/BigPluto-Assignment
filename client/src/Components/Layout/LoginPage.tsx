import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useMutation, useQuery } from 'urql';
import LoginUser from '../../graphql_withoutcodegen/mutations/LoginUser';
import RegisterUser from '../../graphql_withoutcodegen/mutations/RegisterUser';
import { MenuItem } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
import CurrentUsers from '../../graphql_withoutcodegen/Queries/CurrentUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rootReducer from '../../Reducers';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [role, setRole] = useState('');
  const [loginResult, executeLogin] = useMutation(LoginUser);
  const [registerResult, executeRegister] = useMutation(RegisterUser);
  const [{ data, fetching, error }] = useQuery({ query: CurrentUsers });
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: ReturnType<typeof rootReducer>) => state.userReducer);

  useEffect(() => {
    if(currentUser)
    {
      navigate('/body');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior


    const data = {
      email,
      password,
      firstName,
      lastName,
      role,
    };
    if (register) {
      executeRegister({ data }).then((response) => {
        if (response.error) {
          toast.error("Error Registering User");
        } else if (response.data.register) {
          toast.success('User Registered Successfully');
          setRegister(false);
        }
      });
    } else {
      executeLogin({ email, password }).then((response) => {
        if (response.error) {
          toast.error(response.error.message);
        } else if (response.data.login) {     
          toast.success('User Logged In Successfully');
          dispatch({ type: 'SET_USER', payload: response.data.login });     
          navigate('/body');
        }
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 400 }}>
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form" // Use form tag to utilize onSubmit event
            onSubmit={handleSubmit} // Call handleSubmit on form submission
          >
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                {register ? 'Register' : 'Login'}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email" // Set input type to email for validation
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Make the field required
              />
            </Grid>
            {!register && (
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required // Make the field required
                />
              </Grid>
            )}
            {register && (
              <>
                <Grid item>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    required // Make the field required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    required // Make the field required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '220px' }}
                    required // Make the field required
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // Make the field required
                  />
                </Grid>
              </>
            )}
            <Grid item>
              <Button variant="contained" color="primary" type="submit">
                {register ? 'Register' : 'Login'}
              </Button>
            </Grid>
            <Grid item>
              {!register ? (
                <Button onClick={() => setRegister(true)}>Create User ?</Button>
              ) : (
                <Button onClick={() => setRegister(false)}>Login User ?</Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default LoginForm;
