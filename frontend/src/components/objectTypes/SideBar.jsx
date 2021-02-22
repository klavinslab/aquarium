import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';

import objectsAPI from '../../helpers/api/objects';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    overflowY: 'scroll',
  },
}));

// eslint-disable-next-line max-len, jsx-a11y/anchor-is-valid
const SideBar = ({ objectTypeHandlers, setCurrentObjectTypeHandler, setCurrentObjectTypesByHandler, setIsLoading, setAlertProps }) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const init = async (handler) => {
    // wrap the API call
    const response = await objectsAPI.getByHandler(handler);
    if (!response) return;

    // success
    setIsLoading(false);
    setCurrentObjectTypeHandler(handler);
    setCurrentObjectTypesByHandler(response[handler].object_types);
  };

  const handleListItemClick = (event, index, handler) => {
    init(handler);
    setSelectedIndex(index);
    window.scrollTo(0, 0);
  };

  return (
    <Grid
      item
      xs={2}
      name="object-types-side-bar"
      data-cy="object-types-side-bar"
      className={classes.root}
    >
      <Card>
        <CardContent>
          <List component="nav" aria-label="object types list">
            {objectTypeHandlers.map((st, index) => (
              <ListItem
                button
                key={st.handler}
                data-cy={`handler_${st.handler}`}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index, st.handler)}
              >
                <ListItemText primary={st.handler} primaryTypographyProps={{ noWrap: true }} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

SideBar.propTypes = {
  objectTypeHandlers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      handler: PropTypes.string,
    }),
  ).isRequired,
  setCurrentObjectTypeHandler: PropTypes.func.isRequired,
  setCurrentObjectTypesByHandler: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setAlertProps: PropTypes.func,
};

export default SideBar;
