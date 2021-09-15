import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

import ClubCards from './MyClubCards';
import { Link } from 'react-router-dom';
import { db, storage, auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import {changeHeaderText} from '../../Redux/Actions/allActions';
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
    position: 'fixed',
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
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export default function MyAllClubCards(props) {
  const classes = useStyles();
  const [clubsList, setClubList] = useState([]);
  const dispatch = useDispatch();
  const [firebaseData, setFireBaseData] = useState([]);

  console.log(dispatch);
  dispatch(changeHeaderText('Home'));
  useEffect(() => {
    auth.onAuthStateChanged((firebase) => {
      if (firebase) {
        console.log(firebase);
        setFireBaseData(firebase);
      }
    });
  }, []);
  useEffect(() => {
    db.collection('all_clubs').onSnapshot((querySnapshot) => {
      let docs = querySnapshot.docs.filter((doc) => {
        if (doc.data().userId.includes(firebaseData.uid)) {
          //console.log(doc.data())
          return doc;
        }
      });
      setClubList(docs.map((doc) => ({ data: doc.data(), id: doc.id })));
    });
  }, [firebaseData]);

  return (
    <div className={classes.root}>
      {clubsList.map(({ data, id }) => {
        let TempDate = data.date_created.toDate();
        return (
          <Link
            to={{
              pathname: '/club_forum',
              state: {id:id,name:data.club_name},
            }}
            style={{ textDecoration: 'none' }}
          >
            <ClubCards
              key={id}
              background="white"
              title={data.club_name}
              avatar={data.imageUrl}
              participants={data.userId.length}
              date={
                TempDate.getDate() +
                '/' +
                TempDate.getMonth() +
                '/' +
                TempDate.getFullYear()
              }
              solved={data.solved_questions}
              skills={data.skills.toString()}
              Id={'123'}
            />
          </Link>
        );
      })}
    </div>
  );
}
