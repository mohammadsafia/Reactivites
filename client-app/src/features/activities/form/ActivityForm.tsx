import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "types";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import MyTextInput from "app/common/form/MyTextInput";
import MyTextArea from "app/common/form/MyTextArea";
import MySelectInput from "app/common/form/MySelectInput";
import { categoryOptions } from "app/common/options/categoryOptions";
import MyDateInput from "app/common/form/MyDateInput";


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
    date: null,
    city: '',
    venue: ''
  });
  
  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required.'),
    description: Yup.string().required('The activity description is required.'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required.').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });
  
  useEffect(() => {
    if (id) loadActivity(id).then((response) => setActivity(response!));
    else {
      setLoadingInitial(false);
    }
  }, [id, loadActivity, setLoadingInitial]);
  
  
  const handleFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: crypto.randomUUID()
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
      return;
    }
    
    updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
  };
  
  if (loadingInitial) return <LoadingComponent content="Loading activity..."/>;
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal"/>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Title" name="title"/>
            <MyTextArea rows={3} placeholder="Description" name="description"/>
            <MySelectInput options={categoryOptions} placeholder="Category" name="category"/>
            <MyDateInput
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
              placeholderText="Date"
              name="date"
            />
            <Header content="Location Details" sub color="teal"/>
            <MyTextInput placeholder="City" name="city"/>
            <MyTextInput placeholder="Venue" name="venue"/>
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading} floated="right" positive type="submit" content="Submit"/>
            <Button as={Link} to="/activities" floated="right" positive type="button" content="Cancel"/>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);