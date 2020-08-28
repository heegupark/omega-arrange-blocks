import React from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

export default function PlayAgain(props) {
  return (
    <div className='play-again-box'>
      <IconButton
        onClick={() => props.playAgain()}
        color="primary"
        aria-label="play again">
        <ReplayIcon
          fontSize="large"
        />
      </IconButton>
    </div>
  );
}
