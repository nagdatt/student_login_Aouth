import "./App.css";
import { auth, provider } from "./firebase";
import { useState,useEffect } from "react";
import Card from "@material-ui/core/Card";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PolicyIcon from "@material-ui/icons/Policy";
import HomePage from "./components/HomePage";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import {db} from './firebase'
import { useDispatch } from "react-redux";
import {USER_DATA} from './Redux/Actions/allActions';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {
    marginTop: "10%",
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const [show, setShow] = useState(false);
  const  dispatch = useDispatch();

    
  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
   //
   dispatch(USER_DATA(firebaseUser))
      setShow(true);
      if (firebaseUser) {
        console.log(firebaseUser)
        //
        setFireBase(firebaseUser)
       db.collection('userData').where("UID","==",firebaseUser.uid).get().
        then((querysnapshot)=>{
          const size=querysnapshot.size
          if(size==0){
            db.collection('userData').doc(firebaseUser.uid).set({
              Email:firebaseUser.email,
              Name:firebaseUser.displayName,
              Phone_no:firebaseUser.phoneNumber,
              Photo_url:firebaseUser.photoURL,
              UID:firebaseUser.uid,
         },{merge:true})
          }
         
         
          
        }

        )
        .catch((exception)=>{
            console.log(exception)
        })
     
        
       
        
        setIsUserLoggedIn(true);
        console.log(firebaseUser);
        setFireBase(firebaseUser);
      } else {
        setIsUserLoggedIn(false);
      }
    });
    
  }, [])
 
  
  const [IsUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [firebaseData, setFireBase] = useState([]);

  const googleSignIn = () => {
    auth.signInWithPopup(provider);
  };
  useEffect(()=>{
  //  dispatch(USER_DATA(['nagdatt','gajjam']))
  },[firebaseData])
  const classes = useStyles();
  if (!show)
    return (
      
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="blue" />
      </Backdrop>
    );
  return (
    <div >
      {IsUserLoggedIn ? (
        
        <HomePage userData={firebaseData} />
      ) : (
        <Container component="main" maxWidth="xs">
          <Card className={classes.card}>
            <CssBaseline />
            <h1 style={{ marginLeft: "5%" }}>Welcome to websiteName</h1>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PersonOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Button
                onClick={googleSignIn}
                className={classes.submit}
                variant="contained"
                color="primary"
              >
                <FingerprintIcon />
                Google Authentication
              </Button>

              <Grid>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    <PolicyIcon style={{ fontSize: 14, marginRight: 3 }} />
                    {"Privacy policy"}
                  </Link>
                </Grid>
              </Grid>
            </div>
            <Box mt={8}></Box>{" "}
          </Card>
          <Copyright />
        </Container>
      )}
    </div>
  );
}

export default App;




