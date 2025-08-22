import React from 'react';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Services from '../pages/Services';
import News from '../pages/News';
import Videos from '../pages/Videos';
import ProtectedAreas from '../pages/ProtectedAreas';
import ProtectedAreaDetail from '../pages/ProtectedAreaDetail';
import ProtectedAreasMap from '../pages/ProtectedAreasMap';
import Measures from '../pages/Measures';
import Team from '../pages/Team';
import Volunteer from '../pages/Volunteer';
import AboutDev from '../pages/AboutDev';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';

import Norms from '../pages/Norms';
import ReportDamage from '../pages/ReportDamage';
import MyReports from '../pages/MyReports';
import ReportsMap from '../pages/ReportsMap';
import ChangePassword from '../pages/ChangePassword';

type PrivateProps = RouteProps & { component: React.ComponentType<any> };
const PrivateRoute: React.FC<PrivateProps> = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
};

export default function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/services" component={Services} />
      <Route path="/news" component={News} />
      <Route path="/videos" component={Videos} />
      <Route path="/areas" component={ProtectedAreas} />
      <Route path="/areas/:id" component={ProtectedAreaDetail} />
      <Route path="/areas-map" component={ProtectedAreasMap} />
      <Route path="/measures" component={Measures} />
      <Route path="/team" component={Team} />
      <Route path="/volunteer" component={Volunteer} />
      <Route path="/about-dev" component={AboutDev} />

      <Route path="/login" component={Login} />
      <Route path="/forgot" component={ForgotPassword} />

      <Route path="/norms" component={Norms} />
      <Route path="/report" component={ReportDamage} />
      <Route path="/my-reports" component={MyReports} />
      <Route path="/reports-map" component={ReportsMap} />
      <Route path="/change-password" component={ChangePassword} />

      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}
