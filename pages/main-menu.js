import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

export default function MainMenu(props) {
  return (
    <div className='go-to-main-menu-box'>
      <IconButton
        onClick={() => props.mainMenu()}
        color="primary"
        aria-label="go to main menu">
        <HomeIcon
          fontSize="large"
        />
      </IconButton>
    </div>
  );
}
