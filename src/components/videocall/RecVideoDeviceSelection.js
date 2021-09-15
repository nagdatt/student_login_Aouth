import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Route, Link, useLocation } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { db } from '../../firebase';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '200px',
    maxWidth: '300px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function VideoDeviceSelection({ user1Data }) {
  //States
  const [videoDevices, setVideoDevices] = React.useState([]);
  const [audioDevices, setAudioDevices] = React.useState([]);
  const [videoDeviceSelected, setVideoDeviceSelected] = React.useState('');
  const [audioDeviceSelected, setAudioDeviceSelected] = React.useState('');
  const [meetingTopic, setMeetingTopic] = React.useState('');
  const classes = useStyles();
  const location = useLocation();
  const user2Data = location.state.user2Data;
  //useEffect
  useEffect(() => {
    // getConnectedDevices("videoinput", (cameras) => setVideoDevices(cameras));
    // getConnectedDevices("audioinput", (microphones) =>
    //   setAudioDevices(microphones)
    // );
    // console.log(user1Data.Name);
    // console.log(user2Data.Name);
    const getDevices = async () => {
      const res1 = await getConnectedDevices('videoinput');
      const res2 = await getConnectedDevices('audioinput');
      setVideoDevices(res1);
      setAudioDevices(res2);
    };
    getDevices();
  }, []);

  //funcrions

  async function getConnectedDevices(type) {
    let devices = await navigator.mediaDevices.enumerateDevices();
    const filtered = devices.filter((device) => device.kind === type);
    return filtered;
  }

  const handleVideoChange = (event) => {
    setVideoDeviceSelected(event.target.value);
  };

  const handleAudioChange = (event) => {
    setAudioDeviceSelected(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Camera
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={videoDeviceSelected}
              onChange={handleVideoChange}
              label="Select Camera"
            >
              {videoDevices.map((device) => {
                return (
                  <MenuItem value={`${device.deviceId}`}>
                    {device.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Microphone
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={audioDeviceSelected}
              onChange={handleAudioChange}
              label="Select Microphone"
            >
              {audioDevices.map((device) => {
                return (
                  <MenuItem value={`${device.deviceId}`}>
                    {device.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label="Enter Topic Name"
            variant="outlined"
            className={classes.formControl}
            onChange={(e) =>
              setMeetingTopic(e.target.value ? e.target.value : '')
            }
          />
        </Grid>
        <Grid item style={{ margin: 10 }}>
          <Link
            to={{
              pathname: '/ongoingcall',
              state: {
                userSessionType: 'creater',
                audioDeviceSelected: audioDeviceSelected,
                videoDeviceSelected: videoDeviceSelected,
                user1Data: user1Data,
                user2Data: user2Data,
                meetingTopic: meetingTopic,
              },
            }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" color="primary">
              Start Meet
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
