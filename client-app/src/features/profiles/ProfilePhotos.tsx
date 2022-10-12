import React, { SyntheticEvent, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import { Photo, Profile } from "types";
import { useStore } from "app/stores/store";
import PhotoUploadWidget from "app/common/imageUpload/PhotoUploadWidget";

type ProfilePhotosProps = {
  profile: Profile
}
const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ profile }) => {
  const { profileStore: { isCurrentUser, uploadPhoto, uploading, setMainPhoto, loading, deletePhoto } } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');
  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };
  
  const handleSetMainPhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };
  
  const handleDeletePhoto = (photo: Photo, e: SyntheticEvent<HTMLButtonElement>) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="image" content="Photos"/>
          {isCurrentUser && (
            <Button floated="right" basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                    onClick={() => setAddPhotoMode(!addPhotoMode)}/>
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading}/>
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url}/>
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={'main' + photo.id}
                        disabled={photo.isMain}
                        loading={target === 'main' + photo.id && loading}
                        onClick={e => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        disabled={photo.isMain}
                        onClick={e => handleDeletePhoto(photo, e)}
                        loading={target === photo.id && loading}
                        basic color="red" icon="trash"
                        name={photo.id}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);