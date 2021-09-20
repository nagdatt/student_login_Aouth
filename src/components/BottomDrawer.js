//-Bottom Drawer
//-Used to update user Data
//Feilds- like user name, Email, phone No., Skills Etc.

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { db } from '../firebase';
import firebase from 'firebase';
import ShareIcon from '@material-ui/icons/Share';

import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  list: { width: 250 },
  container: { marginBottom: 30, width: '100%' },
  fullList: { width: 'auto' },
  TextField: { width: '100%' },
  links: { width: '100%', marginBottom: '10px' },
  Item: { width: '100%' },
  file: { display: 'none' },
}));

export default function BottomDrawer({ userData }) {
  const classes = useStyles();
  const [MainuserData, setuserData] = React.useState(userData);
  const [skills, setSkills] = React.useState([]);
  /////////////////////////////////////////////////////////////////
  const [userName, setuserName] = React.useState('');
  const [userEmail, setuserEmail] = React.useState('');
  const [userPhoneNo, setuserPhoneNo] = React.useState('');
  const [userSkills, setuserSkills] = React.useState([]);
  const [userGitLink, setuserGitLink] = React.useState('');
  const [userStackOverflowLink, setuserStackOverflowLink] = React.useState('');
  const [userLinkedinLink, setuserLinkedinLink] = React.useState('');
  const [userProtfolioLink, setuserPortfolioLink] = React.useState('');
  const [userProjectLink, setuserProjectLink] = React.useState('');
  const [UID, setUID] = React.useState('');
  const [userLastUpdated, setuserLastUpdated] = React.useState('');

  const [state, setState] = React.useState({
    bottom: false,
  });

  useEffect(() => {
    db.collection('userData')
      .doc(userData.uid)
      .onSnapshot((doc) => {
        // ...consol
        const data = doc.data();
        // console.log(doc.data());
        setUID(data.UID);
        setuserName(data.Name);
        setuserEmail(data.Email);
        setuserPhoneNo(data.Phone_no);
        setuserSkills(data.Skills);
        setuserGitLink(data.Github_link);
        setuserStackOverflowLink(data.Stackoverflow_link);
        setuserLinkedinLink(data.Linkedin_link);
        setuserPortfolioLink(data.Portfolio_link);
        setuserProjectLink(data.Project_link);
        console.log(data.Skills);
        setuserSkills(data.Skills);

        //console.log(userSkills);
        // setuserLastUpdated(data.Last_Updated.toDate().toString());
      });
    db.collection('skills').onSnapshot((querySnapshot) => {
      console.log(
        querySnapshot.docs.map((data) => {
          return data.data().Skill;
        })
      );
      setSkills(
        querySnapshot.docs.map((data) => {
          return data.data().Skill;
        })
      );
    });
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
  const updateData = (anchor, open) => (event) => {
    db.collection('userData').doc(userData.uid).set(
      {
        Github_link: userGitLink,
        Linkedin_link: userLinkedinLink,
        Phone_no: userPhoneNo,
        Portfolio_link: userProtfolioLink,
        Project_link: userProjectLink,
        Skills: userSkills,
        Stackoverflow_link: userStackOverflowLink,
        Last_Updated: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
    >
      {/*      onClick={toggleDrawer(anchor, false)*/}

      <Divider />
      <Container className={classes.container}>
        {/*           Bottom Component               */}
        <div>
          <Grid>
            <Grid item xs={12} md={12}>
              <h1>
                Update Data
                <Button autoCapitalize={false}>
                  <ShareIcon />
                </Button>
              </h1>
            </Grid>
            <Grid item xs={12} md={4}>
              <h6>Last Updated-</h6>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid className={classes.Item} item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                label="Name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                label="Email"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                value={userPhoneNo}
                onChange={(e) => setuserPhoneNo(e.target.value)}
                label="Phone No"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                multiple
                options={skills}
                filterSelectedOptions
                defaultValue={userSkills}
                onChange={(e, value) => {
                  setuserSkills(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Your Skills"
                    placeholder="Favorites"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                value={userGitLink}
                onChange={(e) => setuserGitLink(e.target.value)}
                label="Github Link"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i class="fab fa-github"></i>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                value={userStackOverflowLink}
                onChange={(e) => setuserStackOverflowLink(e.target.value)}
                label="StackOverflow Link"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i class="fab fa-stack-overflow"></i>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                className={classes.TextField}
                label="LinedIn Link"
                value={userLinkedinLink}
                onChange={(e) => setuserLinkedinLink(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i class="fab fa-linkedin-in"></i>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item container md={12}>
              <Grid item container xs={5}>
                <TextField
                  variant="outlined"
                  className={classes.links}
                  label="Portfolio Link"
                  value={userProtfolioLink}
                  onChange={(e) => setuserPortfolioLink(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i class="fas fa-link"></i>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid xs={1}></Grid>
              <Grid item item container xs={6}>
                <TextField
                  variant="outlined"
                  className={classes.TextField}
                  label="Project Link"
                  value={userProjectLink}
                  onChange={(e) => setuserProjectLink(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i class="fas fa-link"></i>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid container item md={11} alignItems="left">
              <Button
                variant="outlined"
                width="100%"
                color="secondary"
                onClick={toggleDrawer('bottom', false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid container item md={1} alignItems="right">
              <Button
                variant="outlined"
                width="100%"
                color="primary"
                onClick={updateData('bottom', false)}
              >
                Save
              </Button>
            </Grid>

            {/*<Grid item md={6}>
             <Button variant="outlined"  color="primary">Skip</Button>
            </Grid>*/}
          </Grid>
        </div>
        {/*           Bottom Component               */}
      </Container>
    </div>
  );
  useEffect(() => {
    const arr = [];
    db.collection('userData').onSnapshot((snapshot) => {
      db.collection('userData')
        .where('Email', '==', 'nagdatt@gmail.com')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            arr.push(doc.data());

            //console.log(doc.id, " => ", doc.data().Email);
          });
          // console.log(arr)
          // console.log(userData)
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    });

    //const row=data.map(doc=>doc.data())
  }, []);

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            edge="start"
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            aria-label="menu"
          >
            {console.log(userData.photoURL)}
            <Avatar
              alt="Sam Sharp"
              src={userData.photoURL}
              aria-label="menu"
              edge="start"
            />
          </IconButton>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
