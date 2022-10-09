import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "types";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";

type ActivityFormProps = {}
const ActivityForm: React.FC<ActivityFormProps> = () => {
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial, setLoadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });
  
  useEffect(() => {
    if (id) loadActivity(id).then((response) => setActivity(response!));
    else {
      setLoadingInitial(false);
    }
  }, [id, loadActivity, setLoadingInitial]);
  
  
  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: crypto.randomUUID()
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
      return;
    }
    
    updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
  };
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
  
  if (loadingInitial) return <LoadingComponent content="Loading activity..."/>;
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
        <Button as={Link} to="/activities" floated="right" positive type="button" content="Cancel"/>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);