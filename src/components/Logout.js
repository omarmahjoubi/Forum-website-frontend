import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut } from '../slices/sessionSlice';


const Logout = () => {
    const history = useHistory();
    const dispatch = useDispatch() ;
    dispatch(logOut())
    history.push('/');
    return(
        <div></div>
    )
    


}

export default Logout ;