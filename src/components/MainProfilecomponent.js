
//Complete User Profile


import {
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,

    width: "100%",
  },
  TextField: {
    width: "100%",
  },
  links: {
    width: "100%",
    marginBottom: "10px",
  },
  Item: {
    width: "100%",
  },
  file: {
    display: "none",
  },
}));
const Profile = (porps) => {
  const classes = useStyles();
  const [skills,setSkills] = useState(["react", "anything"]);
  
  return (
    <div>
      <h1>Update Data</h1>
      <TextField
        id="file-Input"
        
        className={classes.file}
        variant="outlined"
        type="file"
      />
      <Grid container spacing={2}>
        <Grid className={classes.Item} item xs={12} md={4}>
          <TextField
            variant="outlined"
            className={classes.TextField}
            label="Name"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            className={classes.TextField}
            label="Email"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            className={classes.TextField}
            label="Phone No"
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Autocomplete
            multiple
            options={skills}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            variant="outlined"
            className={classes.TextField}
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
            <Grid item item container xs={6} >
              <TextField
                variant="outlined"
                className={classes.TextField}
                label="Project Link"
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
          <Button variant="outlined" width="100%" color="secondary">
            Cancel
          </Button>
        </Grid>
        <Grid container item md={1} alignItems="right" >
          <Button variant="outlined" width="100%" color="primary">
            Save
          </Button>
        </Grid>

        {/*<Grid item md={6}>
             <Button variant="outlined"  color="primary">Skip</Button>
            </Grid>*/}
      </Grid>
    </div>
  );
};

export default Profile;
