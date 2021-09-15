import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { MoreVert, VideoCall } from '@material-ui/icons';
import {
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from '@material-ui/core';
import VideoDeviceSelection from '../videocall/VideoDeviceSelection';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',

    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function UserList({ clubid, user1Data }) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFriendForCall, setSelectedFriendForCall] = React.useState({
    Email: '',
    Name: '',
    Phone_no: '',
    Photo_url: '',
    UID: '',
  });
  const [club_id, setClub_id] = useState(clubid);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    db.collection('all_clubs')
      .doc(club_id)
      .onSnapshot((snapshot) => {
        db.collection('userData').onSnapshot((snap) => {
          setSubscribers(
            snap.docs
              .map((doc) => {
                if (snapshot.data().userId.includes(doc.id)) return doc.data();
              })
              .filter(Boolean)
          );
          {
            /* console.log(
            snap.docs
              .map((doc) => {
                if (snapshot.data().userId.includes(doc.id)) return doc.data();
              })
              .filter(Boolean)
            );*/
          }
        });
      });
  }, []);
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

  const handleDialogOpen = (userSelected) => {
    setSelectedFriendForCall(userSelected);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item lg={12} md={12} sm={12} style={{ paddingTop: 0 }}>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Connect To {selectedFriendForCall.Name}
          </DialogTitle>
          <DialogContent>
            <VideoDeviceSelection
              user1Data={user1Data}
              user2DataProp={selectedFriendForCall}
              userSessionTypeProp="creater"
            ></VideoDeviceSelection>
          </DialogContent>
        </Dialog>

        <Link
          to="/audioStream"
          style={{ textDecoration: 'none', display: 'flex', width: '100%' }}
        >
          <Button
            color="secondary"
            variant="contained"
            size="large"
            style={{ margin: '10px', width: '100%' }}
          >
            Start Audio Stream
          </Button>
        </Link>
        <Divider />
        <List dense className={classes.root}>
          {subscribers.map((eachUser) => {
            return (
              <ListItem key={eachUser.UID} button>
                <ListItemAvatar>
                  <Avatar src={eachUser.Photo_url}>{eachUser.Name}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={eachUser.Name} secondary={'Online'} />
                <ListItemSecondaryAction
                  onClick={() => handleDialogOpen(eachUser)}
                >
                  {/* <Link
                    to={{
                      pathname: '/videoDeviceSelection',
                      state: {
                        user2Data: eachUser,
                        userSessionType: 'creater',
                      },
                    }}
                  > */}
                  <IconButton color="secondary">
                    <VideoCall />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}
