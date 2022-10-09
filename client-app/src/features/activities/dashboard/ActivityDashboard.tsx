import React from 'react';
import { Grid } from "semantic-ui-react";
import { Activity } from "types";
import ActivityList from "features/activities/dashboard/ActivityList";
import ActivityDetails from "features/activities/details/ActivityDetails";
import ActivityForm from "features/activities/form/ActivityForm";

type ActivityDashboardProps = {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity(id: string): void;
  cancelSelectActivity(): void;
  editMode: boolean;
  openForm(id: string): void;
  closeForm(): void;
  createOrEdit(activity: Activity): void;
  deleteActivity(id: string): void;
}
const ActivityDashboard: React.FC<ActivityDashboardProps> = (props) => {
  const { activities, selectedActivity, selectActivity, cancelSelectActivity, createOrEdit, deleteActivity } = props;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity}/>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !props.editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={props.openForm}
          />
        )}
        {props.editMode && (
          <ActivityForm createOrEdit={createOrEdit} closeForm={props.closeForm} activity={selectedActivity}/>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;