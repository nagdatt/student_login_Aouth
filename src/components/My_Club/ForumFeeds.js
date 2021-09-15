import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    borderRadius: 0,
    borderBottom: '1px solid lightgrey',
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },

  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '45%',
    minHeight: '400px',
    objectFit: 'fill',
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 10,
  },
}));

function ForumFeeds(props) {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: '10px' }}>
      <Card className={classes.root}>
        {props.image ? (
          props.image !== '' ? (
            <CardMedia
              className={classes.cover}
              image={props.image}
              title="Live from space album cover"
              style={{ borderRight: '1px solid lightgrey', minWidth: '45%' }}
            />
          ) : (
            ''
          )
        ) : (
          ''
        )}

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" style={{ width: '100%' }}>
              <Grid container spacing={3}>
                <Grid item md={12} style={{ display: 'flex' }}>
                  <Avatar
                    alt="Remy Sharp"
                    className={classes.small}
                    src="https://lh3.googleusercontent.com/a-/AOh14GjZfbusgdV0OUhnGNt-9hzR5v6QsIJG51JDnxGCEA=s96-c"
                  />
                  {props.quesionOwnerName}
                </Grid>
              </Grid>
              <Divider
                style={{
                  width: '100%',
                  minWidth: '100% important',
                  marginTop: 5,
                  marginBottom: 3,
                }}
              />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {props.question}
            </Typography>
          </CardContent>
          <CardActionArea
            disabled={true}
            style={{ borderTop: '1px solid lightgrey' }}
          >
            <div style={{ position: 'sticky', margin: 5 }}>
              <p style={{ color: '#4267B2' }}>
                Tags:{' '}
                {props.tags.map((tag) => {
                  return (
                    <Chip
                      label={tag}
                      onClick={() => {}}
                      onDelete={() => {}}
                      style={{ margin: 1 }}
                      deleteIcon={<DoneIcon />}
                    />
                  );
                })}
              </p>
            </div>
          </CardActionArea>
        </div>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h4>Answers:</h4>
            <div
              style={{ height: 'auto', maxHeight: '250px', overflow: 'auto' }}
            >
              {new Array(Math.floor(Math.random() * 10)).fill(0).map(() => {
                return (
                  <div style={{ marginBottom: 4, fontSize: 12 }}>
                    <Avatar
                      style={{
                        marginRight: 2,
                        width: 22,
                        height: 22,
                        marginBottom: 3,
                      }}
                    />
                    <strong> @Nagdatt Gajjam </strong>
                    Ullamco esse eu nisi non esse ipsum nostrud in. Deserunt
                    minim adipisicing labore consequat cillum laboris. Aliquip
                    eiusmod incididunt mollit labore consequat sunt consequat
                    labore id. Ullamco esse eu t labore consequat sunt consequat
                    labore id. Ullamco esse eu nisi non esse ipsum nnisi non
                    esse ipsum nostrud in. Deserunt minim adipisicing labore
                    consequat cillum laboris. Aliquip eiusmod.
                    <strong>
                      <strong> Not Accepted</strong>{' '}
                      <Switch
                        name="checkedA"
                        onChange={(event) => {
                          event.target.checked = true;
                          event.target.disabled = true;
                        }}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                      <strong> Accepted</strong>
                    </strong>
                  </div>
                );
              })}
            </div>
            <Chat />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles2 = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',

    marginTop: 10,
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
const Chat = () => {
  const classes = useStyles2();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [forum_text, setForumText] = useState('');
  const hiddenFileInput = React.useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setForumText(forum_text.concat(emojiObject.emoji));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Paper component="form" className={classes.root}>
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
          placeholder="Enter Your Answer Here"
          value={forum_text}
          inputProps={{ 'aria-label': 'Enter Your Feed Here' }}
          onChange={(e) => setForumText(e.target.value)}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          type="button"
          className={classes.iconButton}
          aria-label="search"
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
    </div>
  );
};

export default ForumFeeds;
