import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "features/profiles/ProfileHeader";
import ProfileContent from "features/profiles/ProfileContent";
import { observer } from "mobx-react-lite";
import { useStore } from "app/stores/store";
import LoadingComponent from "app/layout/LoadingComponent";

type ProfilePageProps = {}
const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;
  
  useEffect(() => {
    loadProfile(username);
  }, [loadProfile, username]);
  
  if (loadingProfile) return <LoadingComponent content="Loading profile..."/>;
  
  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && (
          <>
            <ProfileHeader profile={profile}/>
            <ProfileContent profile={profile}/>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);