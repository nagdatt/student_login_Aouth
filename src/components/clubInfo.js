//Club Information
//-Club Name
//-Users/Participants List
//Join to club button
//Information About Club
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Badge from "@material-ui/core/Badge";
import { useDispatch } from "react-redux";
import {changeHeaderText} from '../Redux/Actions/allActions';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 30,
  },
  root2: {
    width: "100%",
    marginRight: 30,

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  media: {
    height: 300,
    maxHeight: "100%",
    maxWidth: "100%",

    // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "grey",
  },
  forBadgeRoot: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
}));

export default function ClubInfo() {
  const  dispatch = useDispatch();
  dispatch(changeHeaderText("Club Information"))
  const userData = useSelector((state) => state.changeUserData);
  console.log("User Data------------------")
  console.log(userData)
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  

  let location = useLocation();
  const [club_id, setClub_id] = useState(location);
  const [club_data, setClub_data] = useState([]);
  const [skills, setSkills] = useState([]);
  const [owner_data, setOwnerData] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [joinButton, setjoinButton] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {

 
    db.collection("all_clubs")
      .doc(club_id.state)
      .onSnapshot((snapshot) => {
        setClub_data(snapshot.data());
        setSkills(snapshot.data().skills);
        setOwnerData(snapshot.data().owner_data);
        console.log(snapshot.data());

        db.collection("userData").onSnapshot((snap) => {
          setSubscribers(
            snap.docs
              .map((doc) => {
                if (snapshot.data().userId.includes(doc.id)) return doc.data();
              })
              .filter(Boolean)
          );
        });
      });
  }, []);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  useEffect(() => {
    db.collection('all_clubs').doc(club_id.state).get().then((snap)=>{
      const userIds=snap.data().userId
      const toAddId=userData.uid;
      if(userIds.includes(toAddId))
      {
        setjoinButton(true)
      
        
      }
    }
    )
   
  }, [])
  const addToTheGroup=()=>{
    db.collection('all_clubs').doc(club_id.state).get().then((snap)=>{
      const userIds=snap.data().userId
      const toAddId=userData.uid;
      console.log([userIds,toAddId])
      db.collection('all_clubs').doc(club_id.state).set({
        userId:[...userIds,toAddId]
      },{merge:true})
     }).then(()=>{
      setOpenAlert(true);
      setjoinButton(true)
     // location.transition('/')
     })
     
   }

  return (
    <div>
      <Card className={classes.root}>
        {/*Image */}
        <CardHeader
        
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={club_data.imageUrl}
            >
              {club_data.club_name}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <i>
                <b style={{ fontSize: 18 }}>
                  {club_data.club_name}
                   </b>
            </i>
          }
        
        />
        <CardContent>
            {/*Skills List */}
          <Typography variant="body2" color="textSecondary" component="p">
            <b>What Skills you can Gain-</b>
            <br></br>
            {skills.toString()}
          </Typography>
            {/*Club Description */}
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Club Discription</b>
            <br></br>
            {club_data.description}
          </Typography>
            {/*Queries Solved */}
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Queries solved</b>
            <br></br>
            {club_data.solved_questions}
          </Typography>
            {/*Participats count */}
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Participants</b>
            <Badge
              color="primary"
              style={{ marginLeft: 20, color: "#757DE" }}
              badgeContent={club_data.userId ? club_data.userId.length : ""}
              max={150}
            ></Badge>
          </Typography>
        </CardContent>
  {/*Participants list */}
        <List className={classes.root2}>
          {subscribers.map((subscriber) => {
            return (
              <div>
                <ListItem key={subscriber.UID} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={subscriber.Photo_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={subscriber.Name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Skills - &nbsp;
                        </Typography>
                        {subscriber.Skills
                          ? subscriber.Skills.toString()
                          : "He is noob 😂😅! Make sure you dont"}
                      </React.Fragment>
                    }
                  />
                  {/*<p style={{color:"grey"}}>{subscriber.Email}</p>*/}
                </ListItem>
                <Divider
                  variant="inset"
                  component="li"
                  style={{ marginRight: 30 }}
                />
              </div>
            );
          })}
        </List>
  {/*Join club button */}
        <CardActions disableSpacing style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<GroupAddIcon />}
            onClick={addToTheGroup}
            autoCapitalize={false}
            disabled={joinButton}
          >
            Join club
          </Button>
          <div
            style={{ flex: 1, alignItems: "right", justifyContent: "right" }}
          ></div>
          <p>
          <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={owner_data[3]}
            >
              {club_data.club_name}
            </Avatar>
          }
         
          title={
            <div>
            <i>
              <b >Creator - </b>
            </i>
            {owner_data[1]}
            </div>
          }
          subheader={"September 14, 2016"}
        />
          </p>
        </CardActions>
      </Card>
        {/*Toast after successfully joined club */}
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          Successfully joined to the group
        </Alert>
      </Snackbar>
      {/**Dialog.................... */}
    </div>
  );
}
