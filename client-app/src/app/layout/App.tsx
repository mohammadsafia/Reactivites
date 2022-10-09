import './styles.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Activity } from 'types';
import NavBar from "app/layout/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
    });
  }, []);
  
  
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  };
  
  const handleCancelSelectActivity = () => setSelectedActivity(undefined);
  
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    
    setEditMode(true);
  };
  
  const handleFormClose = () => setEditMode(false);
  
  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
      : setActivities([...activities, activity]);
    
    setEditMode(false);
    setSelectedActivity(activity);
  };
  
  const handleDeleteActivity = (id: string) =>  setActivities([...activities.filter(x => x.id !== id)]);
  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          activities={activities}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
