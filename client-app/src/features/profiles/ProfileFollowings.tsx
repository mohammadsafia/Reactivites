import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "app/stores/store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "features/profiles/ProfileCard";
import { Predicate } from "types/profile.types";

type ProfileFollowingsProps = {
  predicate: Predicate;
}
const ProfileFollowings: React.FC<ProfileFollowingsProps> = ({ predicate }) => {
  const { profileStore } = useStore();
  const { profile, followings, loadFollowings, loadingFollowings } = profileStore;
  useEffect(() => {
    loadFollowings(predicate);
  }, [loadFollowings, predicate]);
  
  const headerContent = predicate === 'followings' ? `People following ${profile?.displayName}` : `People ${profile?.displayName} is following`;
  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={headerContent}/>
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map(profile => (
              <ProfileCard key={profile.username} profile={profile}/>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);