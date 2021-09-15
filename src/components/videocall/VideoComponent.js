import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { Paper, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core';
import { auto } from 'async';
import { Player } from '@lottiefiles/react-lottie-player';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Badge,
  Tooltip,
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import ToggleButtonsMultiple from './ToggleButtonsMultiple';
import { useState, useRef, useEffect } from 'react';
import {
  LockIcon,
  People,
  SurroundSound,
  SwapCalls,
  VerifiedUser,
  Contactless,
  TramRounded,
} from '@material-ui/icons';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { useLocation, Redirect } from 'react-router-dom';
import { db } from '../../firebase';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  video: {
    width: '100%',
    height: '60vh',
    [theme.breakpoints.down('xs')]: {
      height: '30vh',
    },
    borderRadius: '10px',
    objectFit: 'cover',
    transform: 'scaleX(-1)',
    WebkitTransform: 'scaleX(-1)',
    marginTop: '5px',
  },
  buttons: {
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '5px',
  },
  avator: {
    marginRight: '5px',
  },
  nameBackgroundOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    padding: '3px 8px 3px 8px',
    borderRadius: '10px',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

export default function VideoComponent(props) {
  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:sip1.lakedestiny.cordiaip.com',
          'stun:stun1.voiceeclipse.net',
          'stun:stun.callwithus.com',
          'stun:stun.counterpath.net',
          'stun:stun.internetcalls.com',
          'stun:stun.noc.ams-ix.net',
          'stun:stun.phoneserve.com',
          'stun:stun.sipgate.net',
          'stun:stun.stunprotocol.org',
          'stun:stun.voip.aebc.com',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const [backDropOpen, setBackDropOpen] = React.useState(true);
  const [localStream, setLocalStream] = useState();
  const remoteStream = new MediaStream();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [meetingCode, setMeetingCode] = useState('Creating');
  const [meetingTopic, setMeetingTopic] = useState('');
  const [User1Name, setUser1Name] = useState('');
  const [User2Name, setUser2Name] = useState('');
  const [circularProgressOpen, setCircularProgressOpen] = useState(true);
  const [redirectHomePage, setRedirectHomePage] = useState(false);
  const videoLocalEleRef = useRef(null);
  const videoRemoteEleRef = useRef(null);
  const location = useLocation();
  const liveMeetingCollectionRef = db.collection('liveMeeting');
  let peerConnection;
  const user1Data = location.state.user1Data;
  const user2Data = location.state.user2Data;

  async function stopVideoCallPermemnant() {
    if (localStream) {
      await localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }
  useEffect(() => {
    getLocalStream(
      location.state.audioDeviceSelected,
      location.state.videoDeviceSelected
    );
    //console.log(location.state.audioDeviceSelected);
    //console.log(location.state.videoDeviceSelected);
    return () => {
      if (user2Data) {
      }
    };
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds < 60) {
        setSeconds(seconds + 1);
      }
      if (seconds >= 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes >= 60) {
        setHours(hours + 1);
        setMinutes(0);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    videoLocalEleRef.current.srcObject = localStream;
    if (localStream) {
      if (location.state.userSessionType) {
        const userSessionType = location.state.userSessionType;
        if (userSessionType === 'creater') {
          //console.log(userSessionType);

          createRoom(location.state.meetingTopic, user1Data, user2Data);
        } else if (userSessionType === 'joiner') {
          //console.log(userSessionType);
          const incomingCallData = location.state.incomingCallData;
          // console.log('User 1', user1Data);
          // console.log('User 2', user2Data);
          joinRoom(incomingCallData, user1Data, user2Data);
        } else {
          console.log('Bad navigation Error');
        }
      } else {
        console.log('Bad navigation Error');
      }
    }
    return () => {
      if (localStream) {
        stopVideoCallPermemnant();
      }
    };
  }, [localStream]);

  async function createRoom(meetingTopic, user1Data, user2Data) {
    setMeetingTopic(meetingTopic);
    setUser1Name(user1Data.Name);
    setUser2Name(user2Data.Name);
    const roomRef = await db.collection('rooms').doc();
    console.log('Create PeerConnection with configuration: ', configuration);
    peerConnection = new RTCPeerConnection(configuration);
    registerPeerConnectionListeners();
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await roomRef.set(roomWithOffer);
    const roomId = roomRef.id;
    console.log(`New room created with SDP offer. Room ID: ${roomId}`);
    setMeetingCode(roomId);
    // Code for creating a room above

    //Code for calling/notifyiing below
    const liveMeetingData = {
      caller: user1Data.UID,
      topic: meetingTopic,
      meetingCode: roomId,
      receiver: user2Data.UID,
    };
    const liveiMeetingRef = await db
      .collection('liveMeeting')
      .doc(user2Data.UID)
      .set(liveMeetingData, { merge: true })
      .then(() => {
        console.log('Firebase: Live Meeting Set');
      })
      .catch((error) => {
        console.error(error);
      });
    //Code for calling/notifyiing above

    peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
        videoRemoteEleRef.current.srcObject = remoteStream;
      });
    });

    // Listening for remote session description below
    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
    // console.log('create room', peerConnection);

    //onCallEndByReceiverReidrect
    db.collection('liveMeeting')
      .doc(user2Data.UID)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          setRedirectHomePage(true);
        }
      });
  }

  async function joinRoom(incomingCallData, user1Data, user2Data) {
    const roomRef = db
      .collection('rooms')
      .doc(`${incomingCallData.meetingCode}`);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);

    if (roomSnapshot.exists) {
      setMeetingTopic(incomingCallData.topic);
      setMeetingCode(incomingCallData.meetingCode);
      setUser1Name(user1Data.Name);
      setUser2Name(user2Data.Name);
      console.log('Create PeerConnection with configuration: ', configuration);
      peerConnection = new RTCPeerConnection(configuration);
      registerPeerConnectionListeners();
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
      peerConnection.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      peerConnection.addEventListener('track', (event) => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
          videoRemoteEleRef.current.srcObject = remoteStream;
        });
      });

      // Code for creating SDP answer below
      const offer = roomSnapshot.data().offer;
      console.log('Got offer:', offer);
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.createAnswer();
      console.log('Created answer:', answer);
      await peerConnection.setLocalDescription(answer);
      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await roomRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(
              `Got new remote ICE candidate: ${JSON.stringify(data)}`
            );
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
    }
  }

  const getLocalStream = async (audioId, cameraId) => {
    const constraints = {
      audio: false,
      // {
      //   echoCancellation: true,
      //   deviceId: audioId,
      //   noiseSuppression: true,
      // },
      video: {
        deviceId: cameraId,
        // deviceId:
        //   'cf86b4556d85066af20b86a7f4a666bf2c28c4c5b4acc5223193111fba68c204',
      },
    };
    let localStreamData = await navigator.mediaDevices
      .getUserMedia(constraints)
      .catch((error) => {
        if (error.name === 'NotAllowedError') {
          console.log('Permission Denied');
        }
        if (error.name === 'NotFoundError') {
          console.log('No matching devices found');
        }
      });
    //    localStream.addTrack(localStreamData.getTracks);
    setLocalStream(localStreamData);
    // //////remove this line/////////////////////
    //setRemoteStream(localStreamData);
  };

  function registerPeerConnectionListeners() {
    peerConnection.onsignalingstatechange = function (event) {
      console.log('R:onsignalingstatechange', peerConnection.signalingState);
    };
    peerConnection.oniceconnectionstatechange = function (event) {
      console.log(
        'R:oniceconnectionstatechange',
        peerConnection.iceConnectionState
      );
    };
    peerConnection.addEventListener('iceconnectionstatechange', () => {
      console.log(
        'R:iceconnectionstatechange',
        peerConnection.iceConnectionState
      );
      if (peerConnection.iceConnectionState === 'connected')
        setCircularProgressOpen(false);
      if (
        peerConnection.iceConnectionState === 'closed' ||
        peerConnection.iceConnectionState === 'disconnected' ||
        peerConnection.iceConnectionState === 'failed'
      ) {
        peerConnection.restartIce();
        setCircularProgressOpen(true);
      }
      // peerConnection.addEventListener('signalingstatechange', () => {
      //   console.log(`Signaling state change: ${peerConnection.signalingState}`);
      // });
      //console.log(`Connection state change: ${peerConnection.connectionState}`);
      // let status = peerConnection.iceConnectionState;
      // switch (peerConnection.iceConnectionState) {
      //   case 'new':
      //     console.log('Online Status', 'New...');
      //     setCircularProgressValue(10);
      //     break;
      //   case 'checking':
      //     // setOnlineStatus("Connecting...");
      //     console.log('Online Status', 'Checking...');
      //     setCircularProgressValue(40);
      //     break;
      //   case 'connected':
      //     // setOnlineStatus("Online");
      //     console.log('Online Status', 'Connected...');
      //     setCircularProgressValue(100);
      //     break;
      //   case 'completed':
      //     // setOnlineStatus("Disconnecting...");
      //     console.log('Online Status', 'Completed...');
      //     break;
      //   case 'disconnected':
      //     // setOnlineStatus("Disconnecting...");
      //     console.log('Online Status', 'Disconnected...');
      //     break;
      //   case 'closed':
      //     // setOnlineStatus("Offline");
      //     console.log('Online Status', 'Closed...');
      //     break;
      //   case 'failed':
      //     // setOnlineStatus("Error");
      //     console.log('Online Status', 'Failed...');
      //     break;
      //   default:
      //     // setOnlineStatus("Unknown");
      //     console.log('Online Status', 'Unknown...');
      //     break;
      // }
    });

    // peerConnection.addEventListener('iceconnectionstatechange ', () => {
    //   console.log(
    //     `ICE connection state change: ${peerConnection.iceConnectionState}`
    //   );
    // });
  }

  const callEnd = async () => {
    videoRemoteEleRef.current.srcObject = null;
    videoLocalEleRef.current.srcObject = null;
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    if (peerConnection) {
      peerConnection.close();
    }
    if (meetingCode) {
      const roomRef = db.collection('rooms').doc(meetingCode);
      const calleeCandidates = await roomRef
        .collection('calleeCandidates')
        .get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await roomRef
        .collection('callerCandidates')
        .get();
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }
    const userSessionType = location.state.userSessionType;
    const user1Data = location.state.user1Data;
    const user2Data = location.state.user2Data;
    //    console.log(userSessionType);
    if (userSessionType && user1Data && user2Data) {
      if (userSessionType === 'creater') {
        await liveMeetingCollectionRef
          .doc(user2Data.UID)
          .delete()
          .then(() => {
            console.log('Live meeting document successfully deleted!');
            setRedirectHomePage(true);
          })
          .catch((error) => {
            console.error('Error removing Live meeting document: ', error);
          });
      }
      if (userSessionType === 'joiner') {
        await liveMeetingCollectionRef
          .doc(user1Data.UID)
          .delete()
          .then(() => {
            console.log('Live meeting document successfully deleted!');
          })
          .catch((error) => {
            console.error('Error removing Live meeting document : ', error);
          });
      }
    }
  };

  const hideBackDrop = (event) => {
    if (event === 'complete') setBackDropOpen(false);
  };
  const classes = useStyles();
  return (
    <Container fixed>
      <div className={classes.root}>
        {redirectHomePage ? (
          <Redirect to="/" />
        ) : (
          <Grid container direction="row" spacing={1} justify="center">
            <Box color="#555" zIndex={901} position="absolute" top="25%">
              <Grid item xs={12}>
                <Backdrop
                  open={backDropOpen}
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h4">Connecting...</Typography>
                    </Grid>
                    <Grid item>
                      <Player
                        onEvent={hideBackDrop}
                        autoplay={true}
                        src="https://assets6.lottiefiles.com/packages/lf20_j1r6dla9.json"
                        style={{ height: '300px', width: '300px' }}
                      />
                    </Grid>
                  </Grid>
                </Backdrop>
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Tooltip title="Meeting Topic">
                <Button
                  variant="contained"
                  className={classes.buttons}
                  size="large"
                  disableElevation
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                  startIcon={<Contactless />}
                >
                  <Typography
                    variant="button"
                    style={{ textTransform: 'none' }}
                  >
                    {meetingTopic}
                  </Typography>
                </Button>
              </Tooltip>
              <Tooltip title="Meeting Code">
                <Button
                  variant="contained"
                  className={classes.buttons}
                  startIcon={<VerifiedUser />}
                  size="large"
                  disableElevation
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                >
                  <Typography
                    variant="button"
                    style={{ textTransform: 'none' }}
                  >
                    {meetingCode}
                  </Typography>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                component="div"
                variant="body1"
                style={{ position: 'relative', height: '100%', width: '100%' }}
              >
                <Box
                  color="white"
                  position="relative"
                  top={0}
                  left={0}
                  zIndex={800}
                  style={{ height: '100%', width: '100%' }}
                >
                  <video
                    className={classes.video}
                    autoPlay
                    playsInline
                    controls={false}
                    muted
                    ref={videoLocalEleRef}
                    style={{
                      backgroundColor: localStream ? '' : '#3c4043',
                    }}
                  ></video>
                </Box>
                <Box
                  position="absolute"
                  bottom="20px"
                  left="20px"
                  zIndex={900}
                  color="white"
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                    className={classes.nameBackgroundOverlay}
                  >
                    <Grid item>
                      {/*    <Avatar
                      alt="Remy Sharp"
                      src="https://lh3.googleusercontent.com/a-/AOh14GjZfbusgdV0OUhnGNt-9hzR5v6QsIJG51JDnxGCEA=s96-c"
                      className={classes.avator}
                  />*/}
                      <StyledBadge variant="dot"></StyledBadge>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{User1Name}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                component="div"
                variant="body1"
                style={{ position: 'relative', height: '100%', width: '100%' }}
              >
                <Box
                  color="white"
                  position="relative"
                  top={0}
                  left={0}
                  zIndex={800}
                  style={{ height: '100%', width: '100%' }}
                >
                  <video
                    autoPlay
                    playsInline
                    controls={false}
                    className={classes.video}
                    ref={videoRemoteEleRef}
                    style={{
                      backgroundColor:
                        remoteStream.getTracks().length === 0 ? '#3c4043' : '',
                    }}
                  ></video>
                </Box>
                <Box
                  position="absolute"
                  bottom="20px"
                  left="20px"
                  zIndex={900}
                  color="white"
                >
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={1}
                    className={classes.nameBackgroundOverlay}
                  >
                    <Grid item>
                      {/*    <Avatar
                      alt="Remy Sharp"
                      src="https://lh3.googleusercontent.com/a-/AOh14GjZfbusgdV0OUhnGNt-9hzR5v6QsIJG51JDnxGCEA=s96-c"
                      className={classes.avator}
                    />*/}
                      <StyledBadge variant="dot"></StyledBadge>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">{User2Name}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  zIndex={900}
                  style={{ transform: 'translate(-50%,-50%)' }}
                >
                  {circularProgressOpen ? (
                    <CircularProgress
                      variant="indeterminate"
                      color="primary"
                      size={60}
                    />
                  ) : (
                    ''
                  )}
                </Box>
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: '30px' }}>
              <ToggleButtonsMultiple
                localStream={localStream}
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                setLocalStream={setLocalStream}
                callEnd={callEnd}
              ></ToggleButtonsMultiple>
            </Grid>
          </Grid>
        )}
      </div>
    </Container>
  );
}
