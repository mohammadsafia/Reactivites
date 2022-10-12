import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Comment, Header, Loader, Segment } from 'semantic-ui-react';
import { useStore } from "app/stores/store";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from 'yup';
import { formatDistanceToNow } from "date-fns";
type ActivityDetailedChatProps = {
  activityId: string;
}
const ActivityDetailedChat: React.FC<ActivityDetailedChatProps> = ({ activityId }) => {
  const { commentStore } = useStore();
  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          initialValues={{body: ''}}
          onSubmit={(values, { resetForm }) =>
            commentStore.addComment(values).then(() => resetForm())
          }
          validationSchema={Yup.object({
            body: Yup.string().required()
          })}
        >
          {({isSubmitting, isValid, handleSubmit})=> (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps)=> (
                  <div style={{position: 'relative'}}>
                    <Loader active={isSubmitting}/>
                    <textarea onKeyPress={e=> {
                      if(e.key === 'enter' && e.shiftKey){
                        return;
                      }
                      if(e.key === 'Enter' && !e.shiftKey){
                        e.preventDefault();
                        isValid && handleSubmit()
                      }
                    }} {...props.field} rows={2} placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"></textarea>
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || '/assets/user.png'}/>
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
                </Comment.Metadata>
                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
          
        
          

        </Comment.Group>
      </Segment>
    </>
  
  );
};

export default observer(ActivityDetailedChat);