import change from './changeHeader'
import changeUserData from './chageUserData'

import { combineReducers } from 'redux';
const rootReducers=combineReducers(
    {
        change: change,
          changeUserData:changeUserData

    }
);
export default rootReducers;