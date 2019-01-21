//Register User
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
    axios
          .post('api/users/register', userData)
          .then(res => history.push('/login'))
          .catch(err => 
                dispatch({
                    type:GET_ERRORS,
                    payload: err.response.data
                })
            );
};


//Login - Get User Token 

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login',userData)
    .then(res => {
        //Save to localStorage
        const {token} = res.data;
        //Set token to ls
        localStorage.setItem('jwtToken', token);
        //Set token to Auth header
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
        dispatch({
        type:GET_ERRORS,
        payload: err.response.data
    }));
};

//Set logged in user

export const setCurrentUser = (decoded) => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth header  
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));    
};