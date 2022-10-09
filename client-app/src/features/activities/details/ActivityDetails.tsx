import React from 'react';
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "app/stores/store";
import LoadingComponent from "app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

type ActivityDetailsProps = {}
const ActivityDetails: React.FC<ActivityDetailsProps> = () => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, cancelSelectedActivity, openForm } = activityStore;
  
  if (!activity) return <LoadingComponent/>;
  
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={() => openForm(activity.id)} basic color="blue" content="Edit"/>
        <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel"/>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);