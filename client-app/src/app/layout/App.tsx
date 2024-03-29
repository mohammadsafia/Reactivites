import './styles.css';

import NavBar from "app/layout/NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "features/home/HomePage";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import ActivityForm from "features/activities/form/ActivityForm";
import ActivityDetails from "features/activities/details/ActivityDetails";
import TestErrors from "features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "features/errors/NotFound";
import ServerError from "features/errors/ServerError";
import { useStore } from "app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "app/layout/LoadingComponent";
import ModalContainer from "app/common/modals/ModalContainer";
import ProfilePage from "features/profiles/ProfilePage";
import PrivateRoute from "app/layout/PrivateRoute";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);
  
  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app ..."/>;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar/>
      <ModalContainer/>
      <Route exact path="/" component={HomePage}/>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <PrivateRoute exact path="/activities" component={ActivityDashboard}/>
              <PrivateRoute path="/activities/:id" component={ActivityDetails}/>
              <PrivateRoute key={location.key} path={["/create-activity", '/manage/:id']} component={ActivityForm}/>
              <PrivateRoute path="/profiles/:username" component={ProfilePage}/>
              <PrivateRoute path="/errors" component={TestErrors}/>
              <PrivateRoute path="/server-error" component={ServerError}/>
              <PrivateRoute component={NotFound}/>
            </Switch>
          </Container>
        </>
      )}/>
    </>
  );
}

export default observer(App);
