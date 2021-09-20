//Leaderboard for our top 5 users
//-Under Development
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Avatar,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
  Button,
  Grid,
} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import {changeHeaderText} from '../Redux/Actions/allActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function LeaderBoard() {
  const  dispatch = useDispatch();
  dispatch(changeHeaderText("Leader Board"))
  const classes =useStyles();
  const [item, setItem] = useState([
    { img: null, Name: "Sam",emails:"abc@gmail.com", ans: "22", points: "51" },
    { img: null, Name: "Sam",emails:"abc@gmail.com", ans: "22", points: "51" },
    { img: null, Name: "Sam",emails:"abc@gmail.com", ans: "22", points: "51" },
    { img: null, Name: "Sam",emails:"abc@gmail.com", ans: "22", points: "51" },
    { img: null, Name: "Sam",emails:"abc@gmail.com", ans: "22", points: "51" },


 
  ]);
  return (
    <div style={{margin:60}}>
      <div >
      <TableContainer component={Paper} >
        <Table className={classes.table} >
        <TableHead>
          <TableRow >
          <TableCell><b>Top (5)</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="left"><b>Email</b></TableCell>
            <TableCell align="left"><b>Questions Answered</b></TableCell>
            <TableCell align="left"><b>Ponits</b></TableCell>
     
          </TableRow>
        </TableHead>
        <TableBody>
          {item.map(item=>(
            <TableRow>
              <TableCell align="left"><Avatar/></TableCell>
              <TableCell align="left">{item.Name}</TableCell>
              <TableCell align="left">{item.emails}</TableCell>
              <TableCell align="left">{item.ans}</TableCell>
              <TableCell align="left">{item.points}</TableCell>
              </TableRow>
          ))}
         
         </TableBody>
           
        </Table>
      </TableContainer>
      </div>
      
        
            
            
       
    </div>
  );
}

export default LeaderBoard;
