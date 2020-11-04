// TODO: ADD PROP-TYPES
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#00ff22',
    fontSize: '1rem',
  },
}));

const UserMenu = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [logOutErrors, setLoginOutError] = useState(null);
  const [logout, setlogout] = useState(false);

  useEffect(() => {
    if (logout && !logOutErrors !== '') {
      // store token in local storage to keep user logged in between page refreshes
      sessionStorage.clear('token');
    }
  });

  const handleSignOut = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');

    axios
      .post(`token/delete?token=${token}`)
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.data.status === 200) {
          setlogout(true);
          history.push('/login');
          window.location.reload();
        }

        if (response.data.status !== 200) {
          return setLoginOutError(response.data.error);
        }
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };
  if (!sessionStorage.getItem('token')) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={handleMenu}
      >
        ● USER
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleMenuClick('/users')}>
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick('/invoices')}>
          Invoices
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default withRouter(UserMenu);