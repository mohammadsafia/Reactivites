import React from 'react';

import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";

type NavBarProps = {}
const NavBar: React.FC<NavBarProps> = () => {
  const { activityStore } = useStore();
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }}/>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"/>
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()} positive content="Create Activity"/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);