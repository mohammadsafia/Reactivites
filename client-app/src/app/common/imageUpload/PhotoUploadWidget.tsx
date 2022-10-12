import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "app/common/imageUpload/PhotoWidgetDropzone";
import PhotoWidgetCropper from "app/common/imageUpload/PhotoWidgetCropper";

type PhotoUploadWidgetProps = {
  uploadPhoto(file: Blob): void;
  loading: boolean
}
const PhotoUploadWidget: React.FC<PhotoUploadWidgetProps> = ({ uploadPhoto, loading }) => {
  const [files, setFiles] = useState<Array<File & { preview: any }>>([]);
  const [cropper, setCropper] = useState<Cropper>();
  
  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
    }
  };
  
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1- Add Photo"/>
        <PhotoWidgetDropzone setFiles={setFiles}/>
      </Grid.Column>
      
      <Grid.Column width={1}/>
      
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2- Resize image"/>
        {files && files.length > 0 && (
          <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
        )}
      </Grid.Column>
      
      <Grid.Column width={1}/>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1- Preview & Upload"/>
        {files && files.length > 0 && (
          <>
            <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }}></div>
            <Button.Group widths={2}>
              <Button loading={loading} onClick={onCrop} positive icon="check"/>
              <Button disabled={loading} onClick={() => setFiles([])} icon="close"/>
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;