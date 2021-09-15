import React from 'react';
import { useDispatch } from 'react-redux';
import {changeHeaderText} from '../../Redux/Actions/allActions';
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Box,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from '@material-ui/core';
import ParticipantComponent from './ParticipantComponent';
import SpeakerComponent from './SpeakerComponent';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButtonsMultiple from '../videocall/ToggleButtonsMultiple';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { MicOffOutlined } from '@material-ui/icons';
import { MicNone } from '@material-ui/icons';
import { MicRounded } from '@material-ui/icons';
import { RecordVoiceOverRounded } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { useRef, useState } from 'react';
import { purple } from '@material-ui/core/colors';
import UserList from '../My_Club/userList';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: 50,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  icons: {
    color: purple[700],
    fontSize: 25,
  },
  microphoneOn: {
    color: purple[700],
    fontSize: 30,
  },
  microphoneOff: {
    color: theme.palette.secondary.main,
    fontSize: 25,
  },
  popperList: {
    backgroundColor: theme.palette.background.paper,
  },
}));
const micClick = () => {};

export default function AudioComponent(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  dispatch(changeHeaderText('Audio Stream'));
  const elements = [
    1, 2, 5, 6, 54, 5, 1, 2, 5, 6, 54, 5, 1, 2, 5, 6, 54, 5, 1, 2, 5, 6, 54, 5,
    1, 2, 5, 6, 54, 5, 1, 2,
  ];
  const elements1 = [1, 2, 5, 6, 54];
  const [microphoneState, setMicrophoneState] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  return (
    <Container>
      <Grid
        container
        direction="row"
        className={classes.paper}
        alignItems="center"
      >
        <Grid container item direction="row">
          <Grid item>
            <Typography
              variant="h4"
              style={{ margin: '10px', fontWeight: 'bold' }}
            >
              Angular JS
            </Typography>
          </Grid>
        </Grid>
        {elements1.map((item) => {
          return (
            <Grid item xs={2} sm={1}>
              <SpeakerComponent></SpeakerComponent>
            </Grid>
          );
        })}
        {elements.map((item) => {
          return (
            <Grid item xs={2} sm={1}>
              <ParticipantComponent></ParticipantComponent>
            </Grid>
          );
        })}
      </Grid>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
            style={{ marginTop: '16px' }}
          >
            <Grid>
              <ToggleButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={(event) => {
                  setMicrophoneState(!microphoneState);
                }}
                style={{ height: '48px', width: '48px' }}
              >
                {microphoneState ? (
                  <MicRounded className={classes.microphoneOn} />
                ) : (
                  <MicOffOutlined className={classes.microphoneOff} />
                )}
              </ToggleButton>
            </Grid>
            <Grid>
              <Typography variant="caption" style={{ color: '#000' }}>
                {microphoneState ? 'Mic is on' : 'Mic is off'}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.grow} />
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
            style={{ marginTop: '16px' }}
          >
            <Grid>
              <ToggleButton color="inherit" id={id} onClick={handleClick}>
                <RecordVoiceOverRounded className={classes.icons} />
              </ToggleButton>
            </Grid>
            <Grid>
              <Typography variant="caption" style={{ color: '#000' }}>
                Requests(4)
              </Typography>
            </Grid>
          </Grid>

          <Button
            color="secondary"
            style={{
              textTransform: 'capitalize',
              fontWeight: 'bold',
              margin: '5px',
            }}
          >
            End
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <List
              subheader={<ListSubheader>Requests</ListSubheader>}
              className={classes.popperList}
            >
              <ListItem>
                <ListItemText
                  id="switch-list-label-wifi"
                  primary="Venkatrushi Vanga"
                  style={{ paddingRight: '15px' }}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle('wifi')}
                    checked={checked.indexOf('wifi') !== -1}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-wifi"
                  primary="Venkatrushi Vanga"
                  style={{ paddingRight: '15px' }}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle('wifi')}
                    checked={checked.indexOf('wifi') !== -1}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-wifi"
                  primary="Venkatrushi Vanga"
                  style={{ paddingRight: '15px' }}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle('wifi')}
                    checked={checked.indexOf('wifi') !== -1}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText
                  id="switch-list-label-wifi"
                  primary="Venkatrushi Vanga"
                  style={{ paddingRight: '15px' }}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={handleToggle('wifi')}
                    checked={checked.indexOf('wifi') !== -1}
                    inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Popover>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
