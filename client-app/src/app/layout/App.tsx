import './styles.css';

import NavBar from "app/layout/NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "features/home/HomePage";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import ActivityForm from "features/activities/form/ActivityForm";
import ActivityDetails from "features/activities/details/ActivityDetails";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage}/>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar/>
          <Container style={{ marginTop: '7em' }}>
            <Route exact path="/activities" component={ActivityDashboard}/>
            <Route exact path="/activities/:id" component={ActivityDetails}/>
            <Route key={location.key} path={["/create-activity", '/manage/:id']} component={ActivityForm}/>
          </Container>
        </>
      )}/>
    </>
  );
}

export default observer(App);
