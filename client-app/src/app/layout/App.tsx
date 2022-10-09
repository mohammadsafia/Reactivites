import './styles.css';

import { useEffect, useState } from 'react';
import { Activity } from 'types';
import NavBar from "app/layout/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "features/activities/dashboard/ActivityDashboard";
import agent from "app/api/agent";
import LoadingComponent from "app/layout/LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setLoading(true);
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
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
    setSubmitting(true);
    
    if (!activity.id) {
      onCreateActivityHandler(activity);
      return;
    }
    
    onUpdateActivityHandler(activity);
  };
  
  const onCreateActivityHandler = (activity: Activity) => {
    activity.id = crypto.randomUUID();
    agent.Activities.create(activity).then(() => {
      const updatedActivities = [...activities, activity];
      updateActivitiesHandler(updatedActivities, activity);
    });
    return;
  };
  
  const onUpdateActivityHandler = (activity: Activity) => {
    agent.Activities.update(activity).then(() => {
      const updatedActivities = [...activities.filter(x => x.id !== activity.id), activity];
      updateActivitiesHandler(updatedActivities, activity);
    });
  };
  
  const updateActivitiesHandler = (activities: Activity[], submittedActivity: Activity) => {
    setActivities(activities);
    setSelectedActivity(submittedActivity);
    setEditMode(false);
    setSubmitting(false);
  };
  
  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
  };
  
  if (loading) return <LoadingComponent content="Loading app"/>;
  
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
