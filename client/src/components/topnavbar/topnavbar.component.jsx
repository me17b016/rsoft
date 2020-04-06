import React, { Fragment } from 'react';
import './topnavbar.styles.css';

import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TopNavBar = () => 
  <Fragment>
    <Paper elevation={12} square className="topnavbar-nav"> 
      <div className="topnavbar-box-logo">
        <div className="topnavbar-logo">
          <Link to="/" >RSOFT</Link>
        </div>
      </div>
      <div className="topnavbar-box-about">
        <div className="topnavbar-about">
          <Link to="/about"> About </Link>
        </div>
      </div>
    </Paper>
  </Fragment>

export default TopNavBar;