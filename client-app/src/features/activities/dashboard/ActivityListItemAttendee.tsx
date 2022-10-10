import React from 'react';
import { observer } from "mobx-react-lite";
import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "types";
import { Link } from "react-router-dom";
import ProfileCard from "features/profiles/ProfileCard";

type ActivityListItemAttendeeProps = {
  attendees: Profile[]
}
const ActivityListItemAttendee: React.FC<ActivityListItemAttendeeProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.username}
          trigger={
            <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
              <Image size="mini" circular src={attendee.image || '/assets/user.png'}/>
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default observer(ActivityListItemAttendee);