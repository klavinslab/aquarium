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
import SamplesPage from '../samples/SamplesPage';
import HomePage from '../HomePage';
import DeveloperPage from '../developer/DeveloperPage';
import DesignerPage from '../designer/DesignerPage';
import ParametersPage from '../parameters/ParametersPage';
import RolesPage from '../roles/RolesPage';
import UsersPage from '../users/UsersPage';
import UserForm from '../users/UserForm';
import SampleTypesPage from '../sampleTypes/SampleTypesPage';
import ObjectTypesPage from '../objectTypes/ObjectTypesPage';
import ObjectTypeForm from '../objectTypes/ObjectTypeForm';
import DirectPurchasePage from '../directPurchase/DirectPurchasePage';
import ExportWorkflowsPage from '../exportWorkflows/ExportWorkflowsPage';
import InvoicesPage from '../invoices/InvoicesPage';
import WizardsPage from '../wizards/WizardsPage';
import WizardForm from '../wizards/WizardForm';
import LogsPage from '../logs/LogsPage';
import Header from '../navigation/Header';
import UserProfilePage from '../users/UserProfilePage';
import SampleTypeDefinitionForm from '../sampleTypes/SampeTypeForm';
import ImportWorkflowsPage from '../importWorkflows/ImportWorkflowsPage';
import GroupsPage from '../groups/GroupsPage';
import LoadingSpinner from '../shared/LoadingSpinner';
import GroupPage from '../groups/GroupPage';
import GroupForm from '../groups/GroupForm';
import JobsPage from '../jobs/JobsPage';
import AlertToast from '../shared/AlertToast';
import WindowDimensionsProvider from '../../WindowDimensionsProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ab7ff',
      main: '#0B88FB',
      dark: '#005cc7',
      contrastText: '#fff',
    },
    disabled: '#ddd',
  },
  overrides: {
    MuiDivider: {
      root: {
        margin: '16px 0px',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#fff',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '12px',
      },
    },
  },
});

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    marginTop: '72px',
    marginLeft: '20px',
    marginRight: '20px',
    overflowX: 'auto',
    overflowY: 'hidden',
  },

}));

export default function App() {
  const classes = useStyles();

  // isLoading overlay - initialize to "false" and manage in individual components
  const [isLoading, setIsLoading] = useState(false);

  // AlertToast popup - initialize to "false" and manage in individual components
  const [alertProps, setAlertProps] = useState({});

  return (
    <ThemeProvider theme={theme}>
      <WindowDimensionsProvider>
        <div name="app-container" className={classes.root} data-cy="app-container">
          <AlertToast
            open={alertProps.open}
            severity={alertProps.severity}
            message={alertProps.message}
            setAlertProps={setAlertProps}
          />
          <LoadingSpinner isLoading={isLoading} />

          { /* Users cannot interact with the app if they do not have a token */
          !localStorage.getItem('token') && <Redirect to="/login" />
        }
          { /* TODO: REDIRECT TO PROFILE PAGE IF USER HAS NOT SIGNED AGREEMENTS */ }

          <Switch>
            <Route path="/login" render={(props) => <LoginDialog setIsLoading={setIsLoading} {...props} />} />
            <>
              {/* Header should show on all pages except login */}
              <Header />

              <div name="page-content" className={classes.content}> {/* Pages should sit below the nav bar */}
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
                <Route exact path="/wizards/:id/edit" render={(props) => <WizardForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                <Route exact path="/object_types" render={(props) => <ObjectTypesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/object_types/new" render={(props) => <ObjectTypeForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/object_types/:id/edit" render={(props) => <ObjectTypeForm setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                <Route exact path="/direct_purchase" render={(props) => <DirectPurchasePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/import" render={(props) => <ImportWorkflowsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/publish" render={(props) => <ExportWorkflowsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/logs" render={(props) => <LogsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/parameters" render={(props) => <ParametersPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/roles" render={(props) => <RolesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                {/* Main Navigation tabs */}
                <Route exact path="/jobs" render={(props) => <JobsPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                <Route exact path="/manage" render={(props) => <ManagerPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/launcher" render={(props) => <PlansPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/samples" render={(props) => <SamplesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/develop" render={(props) => <DeveloperPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/design" render={(props) => <DesignerPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/user/profile" render={(props) => <UserMenu setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                {/* Right user Menu */}
                <Route exact path="/invoices" render={(props) => <InvoicesPage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />
                <Route exact path="/users/:id/profile" render={(props) => <UserProfilePage setIsLoading={setIsLoading} setAlertProps={setAlertProps} {...props} />} />

                {/* Redirect anything else to HOME (or a 404 page or something else) */}
                {/* TODO */}
              </div>
            </>
          </Switch>
        </div>
      </WindowDimensionsProvider>
    </ThemeProvider>
  );
}
