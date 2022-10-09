import React from 'react';
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "types";

type ActivityDetailsProps = {
  activity: Activity;
  cancelSelectActivity(): void;
  openForm(id: string): void;
}
const ActivityDetails: React.FC<ActivityDetailsProps> = ({ activity, cancelSelectActivity, ...props }) => {
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
        <Button onClick={() => props.openForm(activity.id)} basic color="blue" content="Edit"/>
        <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel"/>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;