import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    margin: 15,
  },
  media: {
    height: "auto",
  },
});

export default function ClubCards(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{ background: props.background }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Grid container spacing={3}>
                <Grid item xs={0.5} md={0.5}>
                  <Avatar src={props.avatar} > {props.avatar[0]}</Avatar>
                </Grid>
                <Grid item md={10} sm={10}>
                  {props.title}
                </Grid>
                <Grid
                  item
                  xs
                  style={{ fontSize: 12 }}
                  container
                  direction="column-reverse"
                  justify="center"
                  alignItems="flex-end"
                >
                  Date-{props.date}
                </Grid>
                
              </Grid>
             
             {/**qwertyu */}
              <Grid container spacing={3}>
                <Grid item style={{ fontSize: 14 }}>
                  Participants-{props.participants}
                </Grid>

                <Grid
                  item
                  xs
                  style={{ fontSize: 12 }}
                  container
                  container
                  direction="column-reverse"
                  justify="center"
                  alignItems="flex-end"
                >
                  Solved-{props.solved}
                </Grid>
               
              </Grid>
            
             <p  style={{ fontSize: 12 }}> Skills- {props.skills}</p> 
            </Typography>
          </CardContent>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
}
