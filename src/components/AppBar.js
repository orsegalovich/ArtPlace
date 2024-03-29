import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles'; //import this in order to override default color
import { useNavigate } from 'react-router-dom';
import zIndex from '@mui/material/styles/zIndex';
import { Logout } from '@mui/icons-material';
import { UserAuth } from '../context/Authcontext';
import { db } from "../firebase";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import getUserData from './GetUserData';


const auth = getAuth();


// This is the upper navigation bar presenting our logo and offering the user the ability to enter his profile.
// Source: https://mui.com/material-ui/react-app-bar/

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Logout'];

const ResponsiveAppBar = ({ signedIn, signedUp }) => {

    const { user, logout } = UserAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [curr_user, setCurrUser] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [firstName, setFirstName] = useState(" ");


  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newvalue) =>{
    setValue(newvalue)
  }

  const handleCloseUserMenu1 = async (event) => {
    event.preventDefault();
    setAnchorElUser(null);
    try{
        await logout();
        console.log('You have logged out')
    }catch(e){
      console.log(e.message)
    }
    navigate('/');
  }; 

  const getUserData1 = async () => {
    var curr_user = await auth.currentUser;
    users.forEach((user) => {
        if (user.uid == curr_user?.uid) {
            setFirstName(user.first_name)
        }
    })
};

    useEffect(() => {

        if (signedIn == false || signedUp == false) {
            setFirstName(" ")
        }
        else {
            getUserData1();
        }
    }, [signedUp, signedIn, curr_user])

  


    useEffect(() => {

        const loadUsers = async () => {
            const tempUsers = await getUserData()
            setUsers(tempUsers);
            var curr = await auth.currentUser;
            setCurrUser(curr)
        }
        loadUsers()

    }, [signedUp])

  return (
    //By wrapping the AppBar with 'ThemeProvider' we can change the default color
    <AppBar position="static" sx={{ width : '100%'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            TURF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none',ml: 12 } }}
          >
            PARTAKE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" > {firstName[0]} </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu1}>
                  <Typography textAlign="center">
                    {setting}
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

