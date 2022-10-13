import React from 'react';
import { Divider, Grid, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "types";
import { observer } from "mobx-react-lite";
import FollowButton from "features/profiles/FollowButton";

type ProfileHeaderProps = {
  profile: Profile
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile.image || '/assets/user.png'}/>
              <Item.Content verticalAlign="middle">
                <Header as="h1" content={profile.displayName}/>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label="Followers" value={profile.followerCount || '0'}/>
            <Statistic label="Following" value={profile.followingCount || '0'}/>
          </Statistic.Group>
          <Divider/>
          <FollowButton profile={profile}/>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);