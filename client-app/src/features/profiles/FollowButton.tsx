import React, { SyntheticEvent } from 'react';
import { Profile } from "types";
import { observer } from "mobx-react-lite";
import { Button, Reveal } from "semantic-ui-react";
import { useStore } from "app/stores/store";

type FollowButtonProps = {
  profile: Profile
}
const FollowButton: React.FC<FollowButtonProps> = ({ profile }) => {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loading } = profileStore;
  
  if (userStore.user?.username === profile.username) return null;
  
  const handleFollow = (e: SyntheticEvent, username: string) => {
    e.preventDefault();
    let following = !profile.following;
    updateFollowing(username, following);
  };
  
  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: '100%' }}>
        <Button fluid color="teal" content={profile.following ? 'Following' : 'Not following'}/>
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: '100%' }}>
        <Button
          basic
          fluid
          color={profile.following ? 'red' : 'green'}
          content={profile.following ? 'Unfollow' : 'Follow'}
          loading={loading}
          onClick={e=> handleFollow(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
};

export default observer(FollowButton);