import React, {useState, useEffect, useRef, Fragment, onChange, onFileChange, classes, SvgIcon, UploadIcon} from 'react';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import {UserAuth} from "../context/Authcontext"
import GetSkills from '../data/GetSkills';


const SkillList = GetSkills();




// This is the sign up page 
// Source: https://github.com/mui/material-ui/tree/v5.6.3/docs/data/material/getting-started/templates/sign-up

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Partake © '}
      <Link color="inherit">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#679E84',
     }
    }
  });

export default function SignUp({setSignedUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const { addToUserdb } = UserAuth();
  const navigate = useNavigate();    
  
  const [skillList, setSkillList] = useState([])

  useEffect(() => {setSignedUp(false)}, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('')
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    try{
      const user_details = {
        first_name : data.get("firstName"),
        last_name : data.get("lastName"),
        short_description : data.get("description"),
        skills : skillList,
        email : data.get('email'),
        field : data.get("study"),
        portfolio : false,
        uposts: []
      }
      await createUser(data.get('email'), data.get('password')) 
      await addToUserdb(user_details)
      navigate('/home')
    }catch(e){
      console.log(e.message)
      setError(e.message)
    }
  };

  
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#679E84' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    //
                                    onChange={(e) => setEmail(e.target.value)}
                                    //
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="study"
                                    label="Field of study"
                                    name="study"

                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    id="SkillsList"
                                    name="Short Description"
                                    label="SkillsList"
                                    fullWidth
                                    variant="standard"
                                    options={SkillList}
                                    getOptionLabel={option => option}
                                    defaultValue={[]}
                                    filterSelectedOptions
                                    onChange={(event, value) => setSkillList(value)}
                               
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Skills"
                                            placeholder="Skills"
                                        />
                                    )}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Short description about yourself"
                                    name="description"
                                    autoComplete="description"
                                    multiline 
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // href="/home" // TODO: is this the right way to link? sould it be onClick method?
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

