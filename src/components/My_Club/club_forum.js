import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ForumFeeds from './ForumFeeds';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {db} from '../../firebase'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',

    position: 'fixed',

    left: '310px',
    bottom: '0%',
    right: 0,
    borderRadius: 0,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
));

export default function ClubForum() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [forum_text, setForumText] = useState('');
  const hiddenFileInput = React.useRef(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [feeds, setFeeds] = React.useState([]);
  const [pagerData, setPagerData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [staticSkills,setStaticSkills]=React.useState([]);
  useEffect(() => {
    const arr = [
      {
        key: '1',
        quesionOwnerName: 'Nagdatt Gajjam',
        question: 'What is react router?',
        image: 'https://wallpapercave.com/wp/wp8604786.jpg',
        tags: ['react', 'react-router', 'MERN', 'Full Stack'],
      },

      {
        key: '2',
        quesionOwnerName: 'Rushi Vanga',
        question: 'how we can install dependencies of geomaps?',
        image:
          'https://www.teahub.io/photos/full/70-705657_incredible-ms-dhoni-hd-wallpapers-te-ms-dhoni.jpg',
        tags: ['android', 'react-native', 'swift', 'android studio', 'kotlin'],
      },

     
    ];

    setFeeds(arr);
  }, []);
  useEffect(()=>{
    // db.collection('skills').docs.onSnapshot((snapshot)=>{
    //   console.log(snapshot)
    // })

  // db.collection('forums').doc('club_id2').get().then((snap)=>{
  //   console.log(snap.data())
  // })
  
    db.collection('skills').onSnapshot((querySnapshot) => {
     
      setStaticSkills(
        querySnapshot.docs.map((data) => {
          return data.data().Skill;
        })
      );
    });


  },[])
  useEffect(() => {
    setPagerData(feeds.slice(0, 5));
  }, [feeds]);
  useEffect(() => {
    const max = page * 5 - 1;
    const min = max - 4;
    console.log(feeds.slice(min, max), min, max);
    setPagerData(feeds.slice(min, max));
  }, [page]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, value) => {
    setPage(value);
    console.log(value);
  };
  return (
    <div>
      <div className="forum" style={{ marginBottom: 40 }}>
        <Grid container direction="row" justify="flex-end">
          <Grid item>
            <Pagination
              count={Math.ceil(feeds.length / 5)}
              color="primary"
              page={page}
              variant="outlined"
              size="medium"
              style={{ marginBottom: '20px' }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            {pagerData.map((feed) => {
              return (
                <ForumFeeds
                  quesionOwnerName={feed.quesionOwnerName}
                  question={feed.question}
                  image={feed.image}
                  tags={feed.tags}
                />
              );
            })}
          </Grid>
          <Grid item>
            <Pagination
              count={Math.ceil(feeds.length / 5)}
              color="primary"
              page={page}
              variant="outlined"
              size="medium"
              style={{ marginTop: '12px' }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </div>

      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <AttachFileIcon
            onClick={() => {
              hiddenFileInput.current.click();
            }}
          />
        </IconButton>
        <input
          type="file"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          ref={hiddenFileInput}
          accept="image/png, image/gif, image/jpeg"
          hidden
        />
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          onClick={handleClick}
        >
          <InsertEmoticonIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Enter Your Feed Here"
          value={forum_text}
          inputProps={{ 'aria-label': 'Enter Your Feed Here' }}
          onChange={(e) => setForumText(e.target.value)}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="button"
          className={classes.iconButton}
          aria-label="search"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>

      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ margin: 5, padding: 5 }}>
          <div>
            Windows:
            <b style={{ padding: 4, borderRadius: 2, background: 'lightgrey' }}>
              <i>
                <kbd>windows</kbd>+<kbd>.</kbd>
              </i>
            </b>
          </div>
          <div style={{ marginTop: 10 }}>
            Mac:
            <b style={{ padding: 4, borderRadius: 2, background: 'lightgrey' }}>
              <i>
                <kbd>Ctrl</kbd>+<kbd>cmd</kbd>+<kbd>space</kbd>
              </i>
            </b>
          </div>
        </div>
        {/* <Picker onEmojiClick={onEmojiClick} onClick={handleClose} /> */}
      </StyledMenu>

      {/***For Skills */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
          <b>#Tags</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select Tags for clearify about your question and thoughts
          </DialogContentText>
          <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={staticSkills}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Tags"
                placeholder="1+ Skill"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
