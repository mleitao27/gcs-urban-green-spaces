import React from 'react';
import { Link } from 'react-router-dom';

import MainButton from '../components/MainButton';

const ExpiredSessionPage = props => {
    return (           
            <div className='centerBox'>
                <h1>Sorry, your session expired.</h1>
                <Link to="/login"><MainButton title='Back to Login Page'/></Link>
            </div>
    );
};

export default ExpiredSessionPage;