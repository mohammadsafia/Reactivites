import React from 'react';
import { SemanticShorthandItem, Tab, TabPaneProps } from "semantic-ui-react";
import { Profile } from "types";
import ProfilePhotos from "features/profiles/ProfilePhotos";
import { observer } from "mobx-react-lite";
import ProfileAbout from "features/profiles/ProfileAbout";
import ProfileFollowings from "features/profiles/ProfileFollowings";
import ProfileActivities from "features/profiles/ProfileActivities";

type Pane = { pane?: SemanticShorthandItem<TabPaneProps>, menuItem?: any, render?: (() => React.ReactNode) | undefined }
type ProfileContentProps = {
  profile: Profile
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile }) => {
  const panes: Pane[] = [
    { menuItem: 'About', render: () => <ProfileAbout/> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/> },
    { menuItem: 'Events', render: () => <ProfileActivities /> },
    { menuItem: 'Followers', render: () => <ProfileFollowings predicate="followers"/> },
    { menuItem: 'Following', render: () => <ProfileFollowings predicate="followings"/> },
  ];
  
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default observer(ProfileContent);