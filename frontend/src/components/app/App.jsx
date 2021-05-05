/* disabling forbidden prop spreading for react-router-dom */
/* eslint-disable react/jsx-props-no-spreading */
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnnouncementsPage from '../announcements/AnnouncementsPage';
import LoginDialog from '../auth/LoginDialog';
import UserMenu from '../navigation/UserMenu';
import ManagerPage from '../manager/ManagerPage';
import PlansPage from '../plans/PlansPage';
import HomePage from '../HomePage';
import DeveloperPage from '../developer/DeveloperPage';
import DesignerPage from '../designer/DesignerPage';
import ParametersPage from '../parameters/ParametersPage';
import RolesPage from '../roles/RolesPage';
import UsersPage from '../users/UsersPage';
import UserForm from '../users/UserForm';
import SampleTypesPage from '../sampleTypes/SampleTypesPage';
import ObjectTypesPage from '../objectTypes/ObjectTypesPage';
import ObjectTypePage from '../objectTypes/ObjectTypePage';
import ObjectTypeForm from '../objectTypes/ObjectTypeForm';
import DirectPurchasePage from '../directPurchase/DirectPurchasePage';
import ExportWorkflowsPage from '../exportWorkflows/ExportWorkflowsPage';
import InvoicesPage from '../invoices/InvoicesPage';
import WizardsPage from '../wizards/WizardsPage';
import WizardForm from '../wizards/WizardForm';
import WizardPage from '../wizards/WizardPage';
import LogsPage from '../logs/LogsPage';
import Header from '../navigation/Header';
import UserProfilePage from '../users/UserProfilePage';
import SampleTypeDefinitionForm from '../sampleTypes/SampeTypeForm';
import ImportWorkflowsPage from '../importWorkflows/ImportWorkflowsPage';
import GroupsPage from '../groups/GroupsPage';
import LoadingSpinner from '../shared/LoadingSpinner';
import GroupPage from '../groups/GroupPage';
import GroupForm from '../groups/GroupForm';
import AlertToast from '../shared/AlertToast';
import Interceptor from '../shared/Interceptor';
import SamplesPage from '../samples/SamplesPage';
import SamplePage from '../samples/SamplePage';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    overflow: 'scroll',
  },

  modal_wrapper: {
    display: '',
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: '1000',
  },

  modal_content: {
    width: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid black',
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5290c1',
      main: '#136390',
      dark: '#003962',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiDivider: {
      root: {
        margin: '16px 0px',
      },
    },
  },
});

export default function App() {
  const classes = useStyles();

  // isLoading overlay - initialize to "false" and manage in individual components
  const [isLoading, setIsLoading] = useState(false);

  // AlertToast popup - initialize to "false" and manage in individual components
  const [alertProps, setAlertProps] = useState({});

  return (
    <>
      <ThemeProvider theme={theme}>
        <AlertToast
          open={alertProps.open}
          severity={alertProps.severity}
          message={alertProps.message}
          setAlertProps={setAlertProps}
        />
        <LoadingSpinner isLoading={isLoading} />
        <div name="app-container" className={classes.container} data-cy="app-container">
          { /* redirect to login if no token / only remove token on logout */
            !localStorage.getItem('token') && <Redirect to="/login" />
          }
          { /* TODO: REDIRECT TO PROFILE PAGE IF USER HAS NOT SIGNED AGREEMENTS */ }

          <Switch>
            <Route path="/login" render={(props) => <LoginDialog setIsLoading={setIsLoading} {...props} />} />
            <>
              {/* Header should show on all pages except login */}
              <Header />

              <Route exact path="/" render={(props) => <HomePage setIsLoading={setIsLoading} {...props} />} />

              {/* Left Hamburger Menu */}
              <Route exact path="/users" render={(props) => <UsersPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/users/new" render={(props) => <UserForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/groups" render={(props) => <GroupsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/groups/new" render={(props) => <GroupForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/groups/:id/show" render={(props) => <GroupPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/groups/:id/edit" render={(props) => <GroupForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/sample_types" render={(props) => <SampleTypesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/sample_types/new" render={(props) => <SampleTypeDefinitionForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/sample_types/:id/edit" render={(props) => <SampleTypeDefinitionForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/announcements" render={(props) => <AnnouncementsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/wizards" render={(props) => <WizardsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/wizards/new" render={(props) => <WizardForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/wizards/:id/show" render={(props) => <WizardPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/wizards/:id/edit" render={(props) => <WizardForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/object_types" render={(props) => <ObjectTypesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/object_types/new" render={(props) => <ObjectTypeForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/object_types/:id/show" render={(props) => <ObjectTypePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/object_types/:id/edit" render={(props) => <ObjectTypeForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              <Route exact path="/direct_purchase" render={(props) => <DirectPurchasePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/import" render={(props) => <ImportWorkflowsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/publish" render={(props) => <ExportWorkflowsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/logs" render={(props) => <LogsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/parameters" render={(props) => <ParametersPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/roles" render={(props) => <RolesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              {/* Samples tab */}
              <Route exact path="/samples" render={(props) => <SamplesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/samples/:id" render={(props) => <SamplePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              {/* Main Navigation tabs */}
              <Route exact path="/manager" render={(props) => <ManagerPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/launcher" render={(props) => <PlansPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/developer" render={(props) => <DeveloperPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/designer" render={(props) => <DesignerPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/user/profile" render={(props) => <UserMenu setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              {/* Right user Menu */}
              <Route exact path="/invoices" render={(props) => <InvoicesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
              <Route exact path="/users/:id/profile" render={(props) => <UserProfilePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

              {/* Redirect anything else to HOME (or a 404 page or something else) */}
              {/* TODO */}
            </>
          </Switch>
        </div>
      </ThemeProvider>
      {/* put interceptor last so it is not the first form on the page */}
      {/* TOOD: replace it so it is not a form and move it back */}
      <Interceptor setAlertProps={setAlertProps} />
    </>
  );
}
