import React from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "app/stores/store";
import { Modal } from "semantic-ui-react";

type ModalContainerProps = {}
const ModalContainer: React.FC<ModalContainerProps> = () => {
  const {modalStore} = useStore();
  
  return (
    <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size="mini">
      <Modal.Content>
        {modalStore.modal.body}
      </Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);