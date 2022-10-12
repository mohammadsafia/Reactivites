import React from 'react';
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';


type PhotoWidgetCropperProps = {
  setCropper(cropper: Cropper): void;
  imagePreview: string;
};
const PhotoWidgetCropper: React.FC<PhotoWidgetCropperProps> = ({ setCropper, imagePreview }) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={setCropper}
    />
  );
};

export default PhotoWidgetCropper;