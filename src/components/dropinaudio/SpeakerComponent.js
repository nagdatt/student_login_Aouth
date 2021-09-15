import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { Typography, Grid } from '@material-ui/core';
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: purple[700],
    color: purple[700],
    width: '10px',
    height: '10px',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '10px',
      height: '10px',
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function SpeakerComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar
              className={classes.large}
              alt="Remy Sharp"
              src="https://lh3.googleusercontent.com/a-/AOh14GjKezN8LDZia8zIV_xgR2pbS0Hkz9n3BMyibugIHQ=s96-c"
            />
          </StyledBadge>
        </Grid>
        <Grid item>
          <Typography variant="caption">Speaker</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
