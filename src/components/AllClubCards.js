import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClubCards from "./ClubCards";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Box from '@material-ui/core/Box';
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slide from "@material-ui/core/Slide";
import { db ,storage,auth} from "../firebase";
import { useEffect } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import {changeHeaderText} from '../Redux/Actions/allActions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
 
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
export default function AllClubCards(props) {
  const dispatch=useDispatch();
  dispatch(changeHeaderText("All Clubs"));
  const classes = useStyles();
  const [DialogOpen, setDialogOpen] = useState(false);
  const [SKills, setSkills] = useState([]);
  const[getskills,setGetSkills]=useState([]);
  const [club_name,setClubName]=useState('');
  const [club_desc,setClubDesc]=useState('');
  const[file,setFile]=useState('');
  const [progress,setProgress]=useState(0);
  const[firebaseData,setFireBaseData]=useState([]);
  const [clubsList,setClubList]=useState([]);
  useEffect(() => {
    db.collection("skills").onSnapshot((querySnapshot) => {
    /*  console.log(
        querySnapshot.docs.map((data) => {
          return data.data().Skill;
        })
      );*/
      setSkills(
        querySnapshot.docs.map((data) => {
          return data.data().Skill;
        })
      );
    });
    auth.onAuthStateChanged((firebase)=>{
      if(firebase){
        setFireBaseData(firebase)
      }
    })
    db.collection('all_clubs').onSnapshot(querySnapshot=>{
     setClubList(
        querySnapshot.docs.map((doc) =>( {data:doc.data(),id:doc.id}))
      );
    //  console.log(querySnapshot.docs.map((doc) =>( {data:doc.data(),id:doc.id})))
    })


  }, []);
  const uploadForm=()=>{
   // console.log(club_name);
  //  console.log(getskills);
  //  console.log(club_desc);
  //  console.log(file.name);
  //  console.log(firebaseData)
    const uploadTask=storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        const PROGRESS=Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setProgress(PROGRESS)
      },
      (error)=>{
       alert(error.message) 
       setDialogOpen(false);
       setClubName('');
       setClubDesc('');
       setGetSkills([]);
       setFile('');
       setProgress(0);
       console.log(error)
      },
      ()=>{
        //After Compliition of image uploading
        storage.ref('images')
                      .child(file.name)
                      .getDownloadURL()
                      .then((url)=>{
                        //console.loglog(firebaseData)
                        db.collection('all_clubs').add({
                          club_name:club_name,
                          date_created:firebase.firestore.FieldValue.serverTimestamp(),
                          description:club_desc,
                          imageUrl:url,
                          owner_data:[firebaseData.uid,firebaseData.displayName,firebaseData.email,firebaseData.photoURL],
                          skills:getskills,
                          solved_questions:0,
                          userId:[firebaseData.uid]
                          
                        })



                        setDialogOpen(false);
                        setClubName('');
                        setClubDesc('');
                        setGetSkills([]);
                        setFile('');
                        setProgress(0);
                        console.log(url)
                      }
                      )
      
      }
    )
   
  }
  const handleOpenDialog = () => {
    //alert("Hello")
    setDialogOpen(true);
  };
  return (
    <div className={classes.root} > 
    { clubsList.map(({data,id})=>{
      let TempDate=data.date_created?data.date_created.toDate():"";
     return( 
       <Link to={{
         pathname:"/clubinfo",
         state:id
       }} style={{textDecoration: "none"}}>
        <ClubCards  
       key={id}  
       background="white" 
       title={data.club_name} 
       avatar={data.imageUrl}
       participants={data.userId.length} 
       date={TempDate.getDate()+"/"+(TempDate.getMonth()+1)+"/"+TempDate.getFullYear()} 
       solved={data.solved_questions} 
       skills={data.skills.toString()}
       Id={"123"}
       
        />
        </Link>
        )
     })}
     
    
      <Tooltip title="Create A Club" aria-label="Create A Club">
        <Fab
          color="secondary"
          className={classes.fab}
          variant="extended"
          onClick={handleOpenDialog}
          position={"fixed"}
          aria-label="add"
        >
          <AddIcon /> Create
        </Fab>
      </Tooltip>
      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        open={DialogOpen}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title">Create A Club</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="standard-basic"
            label="Club Name"
            value={club_name}
            onChange={(event)=>{setClubName(event.target.value)}}
            style={{ width: "100%", marginBottom: 10 }}
            variant="outlined"
          />

          <Autocomplete
            multiple
            id="multiple-limit-tags"
            options={SKills}
            value={getskills}
            onChange={(event,value)=>{setGetSkills(value)}}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skill Sets"
                placeholder="Skill +1"
              />
            )}
          />
          <TextareaAutosize
            rowsMax={14}
            rowsMin={6}
            id="standard-basic"
            label="Club Description"
            placeholder="Description"
            value={club_desc}
            onChange={(event)=>{setClubDesc(event.target.value)}}
            style={{ width: "100%", marginTop: 10 }}
            variant="outlined"
          />
          <input type="file"
          fullWidth={true} 
          onChange={(e)=>{
            if(e.target.files[0]){
              setFile(e.target.files[0])
            }
          }}
          />
          <LinearProgressWithLabel value={progress} />
        </DialogContent>
        <DialogActions>
          <Button
          
            color="primary"
            onClick={() => {
              setDialogOpen(false);
            }}
           
          >
            Cancel
          </Button>
          <Button
          
            color="primary"
            variant="contained"
            onClick={uploadForm}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
{
  /**

    
           
    <TextField
    id="standard-basic"
    label="Club Name"
    style={{width:"100%" ,marginBottom:10}}
    variant="outlined"
    
  />


  <Autocomplete
    multiple
    id="multiple-limit-tags"
    options={["top100Film1s", "top100Film2s", "top100Films"]}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="outlined"
        label="limitTags"
        placeholder="Favorites"
      />
    )}
  />


</DialogContent>
<DialogContent dividers>
<TextField
id="standard-basic"
label="Club Description"
style={{ margin: 10 }}
variant="outlined"
style={{ width: "100%" }}
/>
<br></br> <b style={{ color: "grey", margin: 3 }}>Drop Dp here</b>
<DropzoneDialogExample />
*/
}
