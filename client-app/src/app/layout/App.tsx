import './styles.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from 'types';
import NavBar from "app/layout/NavBar";
import { Container, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    });
  }, []);
  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <List>
          {activities.map((activity) => <List.Item key={activity.id}>{activity.title}</List.Item>)}
        </List>
      </Container>
    </>
  );
}

export default App;
