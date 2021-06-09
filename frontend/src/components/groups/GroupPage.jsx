import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import SideBar from './SideBar';
import { LinkButton } from '../shared/Buttons';
import groupsAPI from '../../helpers/api/groupsAPI';

// Route: /object_types
// Linked in LeftHamburgeMenu

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrapper: {
    padding: '0 24px',
  },

  letter: {
    color: theme.palette.primary.main,
  },

  /* flex */
  flexWrapper: {
    padding: '0 16px',
  },

  flex: {
    display: '-ms-flexbox',
    // eslint-disable-next-line no-dupe-keys
    display: 'flex',
    position: 'relative',
  },

  /* Title row */
  flexTitle: {
    padding: '8px 0',
    borderBottom: '2px solid #ccc',
  },

  /* Data Row */
  flexRow: {
    padding: '8px 0',
    borderBottom: '1px solid #ccc',
    '&:hover': {
      boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.8)',
    },
  },

  /* Column definiions */
  flexCol1: {
    flex: '1 1 0',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
  },

  flexCol2: {
    flex: '2 1 0',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
  },

  flexCol3: {
    flex: '3 1 0',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
  },

  flexCol4: {
    flex: '4 1 0',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
  },

  flexColAuto: {
    width: 'auto',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
  },

  /* Use to scale and hide columns in the title row */
  flexColAutoHidden: {
    width: 'auto',
    marginRight: '8px',
    paddingLeft: '8px',
    minWidth: '0',
    visibility: 'hidden',
  },

  show: {
    display: 'block',
  },

  hide: {
    display: 'none',
  },

  pointer: {
    cursor: 'pointer',
  },
}));

const GroupPage = ({ setIsLoading, setAlertProps, match }) => {
  const classes = useStyles();
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const id = match.params.id;

  const init = async () => {
    // wrap the API call
    const response = await groupsAPI.getGroupById(id);
    if (!response) return;

    // success
    setGroupName(response.group.name);
    setGroupMembers(response.members);
  };

  // initialize to all and get permissions
  useEffect(() => {
    init();
  }, []);

  const handleRemove = async (userId) => {
    // wrap the API call
    const response = await groupsAPI.removeMember(id, userId);
    if (!response) return;

    // success
    init();
  };

  return (
    <>
      <Toolbar className={classes.header}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          component="div"
          data-cy="page-title"
        >
          <Typography display="inline" variant="h6" component="h1">
            Groups
          </Typography>
          <Typography display="inline" variant="h6" component="h1">
            {groupName}
          </Typography>
        </Breadcrumbs>

        <div>
          <LinkButton
            name="All Groups"
            testName="all_groups_button"
            text="All Groups"
            light
            type="button"
            linkTo="/groups"
          />
        </div>
      </Toolbar>

      <Divider />

      <Grid container className={classes.root}>
        {/* SIDE BAR */}
        <SideBar
          setIsLoading={setIsLoading}
          setAlertProps={setAlertProps}
          id={id}
          refresh={init}
        />

        {/* MAIN CONTENT */}
        <Grid item xs={9} name="main-container" data-cy="main-container" overflow="visible">
          <div className={classes.flexWrapper}>
            <div className={`${classes.flex} ${classes.flexTitle}`}>
              <Typography className={classes.flexCol1}><b>Name</b></Typography>
              <Typography className={classes.flexCol1}><b>Login</b></Typography>
              <Typography className={classes.flexColAutoHidden}>Remove</Typography>
            </div>

            {groupMembers ? (
              groupMembers.map((member) => (
                <div className={`${classes.flex} ${classes.flexRow}`} key={`member_${member.id}`}>
                  <Typography className={classes.flexCol1}>
                    {member.name}
                  </Typography>
                  <Typography className={classes.flexCol1}>
                    {member.login}
                  </Typography>
                  <Typography className={classes.flexColAuto}>
                    {/* eslint-disable-next-line max-len, jsx-a11y/anchor-is-valid */}
                    <Link data-cy={`remove_${member.id}`} className={classes.pointer} onClick={() => handleRemove(member.id)}>Remove</Link>
                  </Typography>
                </div>
              ))
            ) : (
              ''
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

GroupPage.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  setAlertProps: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
  }).isRequired,
};

export default GroupPage;
