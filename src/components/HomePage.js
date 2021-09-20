//Home page -IMPORTANT PAGE
//Stores User Data
//Login Authentication
/*
Merging All components
Routing for SPA
Navigation
 */
import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Box } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from './Drawer';
import BottomDrawer from './BottomDrawer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LeaderBoard from './LeaderBoard';
import AllClubCards from './AllClubCards';
import MyAllClubCards from './My_Club/MyAllClubs';
import ClubInfo from './clubInfo';
import MyClubData from './My_Club/MyClubData';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import VideoDeviceSelection from './videocall/VideoDeviceSelection';
import IncomingVideoCall from './videocall/IncomingVideoCall';
import VideoComponent from './videocall/VideoComponent';
import AudioComponent from './dropinaudio/AudioComponent';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomePage(props) {
  const classes = useStyles();
  const appbarName = useSelector((state) => state.change);
  const [incomingCall, setincomingCall] = useState(null);
  const userDataJson = {
    Email: props.userData.email,
    Name: props.userData.displayName,
    Phone_no: props.userData.phoneNumber,
    Photo_url: props.userData.photoURL,
    UID: props.userData.uid,
  };

  useEffect(() => {
    const liveMeetingSnapshot = db
      .collection('liveMeeting')
      .doc(userDataJson.UID)
      .onSnapshot((doc) => {
        // ...consol
        const data = doc.data();
        if (data) {
          setincomingCall(data);
          console.log(data);
        } else {
          setincomingCall(null);
        }
      });
    return () => {
      liveMeetingSnapshot();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="sticky">
          <Toolbar>
            <Drawer />
            <Typography variant="h6" className={classes.title}>
              {appbarName}
            </Typography>
            <BottomDrawer userData={props.userData} />
          </Toolbar>
        </AppBar>

        {incomingCall ? <Redirect to="/calling" /> : <Redirect to="/" />}
        {/*<ControlledAccordions/>*/}
        <Switch>
          <Route exact path="/leaderBoard">
            <LeaderBoard />
          </Route>
          <Route exact path="/club_list">
            <AllClubCards firebaseData={props.firebaseData} />
          </Route>
          <Route exact path="/clubinfo">
            <ClubInfo />
          </Route>
          <Route exact path="/club_forum">
            <MyClubData user1Data={userDataJson} />
          </Route>
          <Route exact path="/videoDeviceSelection">
            <VideoDeviceSelection user1Data={userDataJson} />
          </Route>
          <Route exact path="/calling">
            <IncomingVideoCall
              userData={userDataJson}
              callData={incomingCall}
            ></IncomingVideoCall>
          </Route>
          <Route exact path="/ongoingcall">
            <VideoComponent></VideoComponent>
          </Route>
          <Route exact path="/audioStream">
            <AudioComponent user1Data={userDataJson} />
          </Route>
          <Route exact path="/">
            <MyAllClubCards data={props.firebaseData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
