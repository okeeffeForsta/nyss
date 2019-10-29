import './App.scss'

import React from 'react';
import { Route, Switch } from 'react-router'
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { Home } from '../homePage/Home';
import { LoginPage } from '../loginPage/LoginPage';
import { AuthRoute } from './AuthRoute';
import { ConnectedRouter } from 'connected-react-router'
import { NationalSocietiesListPage } from '../nationalSocieties/NationalSocietiesListPage';
import { accessMap } from '../../authentication/accessMap';
import { NationalSocietiesCreatePage } from '../nationalSocieties/NationalSocietiesCreatePage';
import { NationalSocietiesEditPage } from '../nationalSocieties/NationalSocietiesEditPage';
import { NationalSocietiesDashboardPage } from '../nationalSocieties/NationalSocietiesDashboardPage';

export const App = ({ history }) => (
  <ThemeProvider theme={theme}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/login' component={LoginPage} />

        <AuthRoute exact path='/' component={Home} />
        <AuthRoute exact path='/nationalsocieties' component={NationalSocietiesListPage} roles={accessMap.nationalSocieties.list} />
        <AuthRoute exact path='/nationalsocieties/add' component={NationalSocietiesCreatePage} roles={accessMap.nationalSocieties.add} />
        <AuthRoute exact path='/nationalsocieties/:nationalSocietyId' component={NationalSocietiesDashboardPage} roles={accessMap.nationalSocieties.add} />
        <AuthRoute exact path='/nationalsocieties/:nationalSocietyId/edit' component={NationalSocietiesEditPage} roles={accessMap.nationalSocieties.edit} />
      </Switch>
    </ConnectedRouter>
  </ThemeProvider>
);

export default App;