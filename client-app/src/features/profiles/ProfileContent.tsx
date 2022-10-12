import React from 'react';
import { SemanticShorthandItem, Tab, TabPaneProps } from "semantic-ui-react";
import { Profile } from "types";
import ProfilePhotos from "features/profiles/ProfilePhotos";
import { observer } from "mobx-react-lite";

type Pane = { pane?: SemanticShorthandItem<TabPaneProps>, menuItem?: any, render?: (() => React.ReactNode) | undefined }
type ProfileContentProps = {
  profile: Profile
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile }) => {
  const panes: Pane[] = [
    { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
    { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/> },
    { menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
    { menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane> },
    { menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane> },
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