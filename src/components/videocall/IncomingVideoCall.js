import React, { useState, useEffect } from 'react';
import { green } from '@material-ui/core/colors';
import {
  Grid,
  Button,
  Paper,
  Typography,
  makeStyles,
  Avatar,
  Backdrop,
} from '@material-ui/core';
import { Call, CallEnd } from '@material-ui/icons';
import { db } from '../../firebase';
import { doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  backdrop: {},
  paper: {
    height: 'auto',
    width: '350px',
    paddingBottom: '20px',
  },
  margin16: { padding: '16px' },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  callBtns: {
    margin: '15px 20px 0px 20px',
    width: '300px',
  },
}));
export default function IncomingVideoCall({ userData, callData }) {
  const classes = useStyles();
  const [callerData, setcallerData] = React.useState({});
  const liveMeetingCollectionRef = db.collection('liveMeeting');
  const declineCall = () => {
    if (callData) {
      liveMeetingCollectionRef
        .doc(userData.UID)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
  };
  useEffect(() => {
    //console.log('Incoming Call', userData);
    // console.log('Incoming Call', callData);
    if (callData) {
      db.collection('userData')
        .doc(callData.caller)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log('Document data:', doc.data());
            setcallerData(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
            setcallerData({});
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, [callData]);
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Backdrop className={classes.backdrop} open={true}>
            <Paper elevation={3} className={classes.paper}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.margin16}
                  >
                    {callerData.Name} wants to connect?
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    alt="Remy Sharp"
                    src={callerData.Photo_url}
                    className={classes.large}
                  />
                </Grid>

                <Grid item className={classes.margin16}>
                  <Typography variant="subtitle2" align="center">
                    Meeting ID :{callData ? callData.meetingCode : ''}
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    <strong>Topic</strong> <br />
                    {callData ? callData.topic : ''}
                  </Typography>
                </Grid>

                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Link
                      bu
                      to={{
                        pathname: '/videoDeviceSelection',
                        state: {
                          userSessionType: 'joiner',
                          incomingCallData: callData,
                          user2Data: callerData,
                        },
                      }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.callBtns}
                        startIcon={<Call />}
                        style={{ backgroundColor: green[500] }}
                      >
                        Accept
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.callBtns}
                      startIcon={<CallEnd />}
                      onClick={declineCall}
                    >
                      Decline
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Backdrop>
        </Grid>
      </Grid>
    </div>
  );
}
