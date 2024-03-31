import React from 'react';
import { AppBar, Typography, Avatar, makeStyles, Menu, MenuItem } from '@material-ui/core';
import Profile from '../../images/image.png';
import LogoutUser from '../../graphql_withoutcodegen/mutations/LogoutUser';
import { useMutation, useQuery } from 'urql';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  avatarButton: {
    cursor: 'pointer',
    height : '50px',
    width : '50px',
  },
}));

export default function Header(): JSX.Element {
  const classes = useStyles();
  const [openMenu, setopenMenu] = React.useState<null | HTMLElement>(null);
  const [logoutResult , executeLogout] = useMutation(LogoutUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {    
    setopenMenu(event.currentTarget);
  };

  const handleLogout = () => {
    // Your logout logic here
    executeLogout().then((response)=>{
        if(response.error){
            toast.error(response.error.message);
        }
        else if(response.data.logout){
            dispatch({ type: 'SET_USER', payload: null });
            navigate('/login');
        }
    })
    handleClose();
  };

  const handleClose = () => {
    setopenMenu(null);
  };

  return (
    <AppBar className={classes.appBar} position='static' color="inherit">
      <Typography variant='h3' style={{fontFamily : 'cursive'}}>Posts</Typography>
      <Avatar
        className={classes.avatarButton}
        src={Profile}
        alt="Avatar"
        onClick={handleAvatarClick}
      />
      <Menu
        id="logout-menu"
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        onClose={handleClose}
        style={{ marginTop: '50px' }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}
