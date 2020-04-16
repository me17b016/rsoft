import React from 'react';
import './spinnerbutton.styles.css';

import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStylesFacebook = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row'
  },
  top: {
    color: '#eef3fd',
  },
  bottom: {
    color: '#6798e5',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
});

function FacebookProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className="spinner-box">
      <div className="spinner-text">GENERATING</div>
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.top}
          size={24}
          thickness={4}
          {...props}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.bottom}
          size={24}
          thickness={4}
          {...props}
        />
      </div>
    </div>
  );
}

export default FacebookProgress;