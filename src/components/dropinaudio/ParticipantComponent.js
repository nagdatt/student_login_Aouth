import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

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

export default function ParticipantComponent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignContent="center" justify="center">
        <Grid item>
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src="https://lh3.googleusercontent.com/a-/AOh14GjKezN8LDZia8zIV_xgR2pbS0Hkz9n3BMyibugIHQ=s96-c"
          />
        </Grid>
        <Grid item>
          <Typography variant="caption">Listener</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
