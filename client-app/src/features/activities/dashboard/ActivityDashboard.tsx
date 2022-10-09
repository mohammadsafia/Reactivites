import React, { useEffect } from 'react';
import { Grid } from "semantic-ui-react";
import ActivityList from "features/activities/dashboard/ActivityList";
import LoadingComponent from "app/layout/LoadingComponent";
import ActivityFilters from "features/activities/dashboard/ActivityFilters";

import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

type ActivityDashboardProps = {}
const ActivityDashboard: React.FC<ActivityDashboardProps> = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;
  
  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, activityStore, loadActivities]);
  
  
  if (activityStore.loadingInitial) return <LoadingComponent content="Loading app"/>;
  
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList/>
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);