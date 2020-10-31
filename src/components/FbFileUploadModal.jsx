import React, { useState } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

export const defaultState = {
  error: null, // any error on page or api
  data: null,
  stage: 'ready', // uploading
  selectedFile: null,
  isOpen: false,
};

export function FbFileUploadModal(props) {
  const { api, onUploadSuccess, onUploadError } = props;
  const [state, setState] = useState(defaultState);
  
  const closeModal = () => setState({ ...state, isOpen: false });
  const openModal = () => setState({ ...state, isOpen: true });

  const onChangeFile = (ev) => {
    const selectedFile = ev.target.files[0];
    console.log('onChangeFile', selectedFile);
    setState({ ...state, selectedFile });
  };

  const onClickCancel = (ev) => {
    setState({ ...state, isOpen: false });
  };

  const onClickUpload = async (ev) => {
    try {
      setState({ ...state, error: null, stage: 'uploading', apiResult: null });
      if (!state.selectedFile) throw new Error('no file selected');
      const form = new FormData();
      form.append('fb_file', state.selectedFile);
      const { data, error: uploadErr = null } = await api._upload(form);
      if (uploadErr) {
        setState({ ...state, stage: 'ready', data, error: uploadErr });
      } else {
        const { asset_id, file_name, file_type, ...otherInfo } = data;
        const input = {
          id: asset_id,
          asset_type: 'image',
          media_type: file_type,
          label: 'image uploaded ' + (new Date()).toISOString(),
          url: file_name,
          meta: otherInfo,
        };
        const { data: assetIdCreated, error: createErr = null } = await api.asset_create(input);
        if (createErr) {
          setState({ ...state, stage: 'ready', data, error: createErr });
        } else { // assetIdCreated === asset_id
          setState({ ...state, stage: 'ready', data, isOpen: false });
          onUploadSuccess(data);
        }
      }
    } catch (err) {
      setState({ ...state, stage: 'ready', error: err.message });
    }
  };
  const onClickAttach = ev => {
    // TODO
    closeModal();
  };
  const onClose = ev => closeModal();
  const onOpen = ev => openModal();
  const modalProps = {
    onClose,
    onOpen,
    open: state.isOpen,
    closeOnEscape: false,
    closeOnDimmerClick: false,
    size: 'small',
    trigger: <Button type='button'>Attach photo</Button>
  };

  return (
    <Modal {...modalProps}>
      <Header icon='image' content='Upload and attach a photo' />
      <Modal.Content>
        <Modal.Description>
          <Header>Image</Header>
          <p>Please select an image to upload</p>
          <p><input type="file" name="fb_file" onChange={onChangeFile} /></p>
          <p>{state.error}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClickCancel} color='black'>Cancel</Button>
        <Button onClick={onClickUpload} color='purple'>Upload</Button>
      </Modal.Actions>
    </Modal>
  );
}
