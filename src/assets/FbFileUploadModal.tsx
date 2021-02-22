import { Component, PropsWithChildren } from 'react';
import { Button, Header, Modal, Progress } from 'semantic-ui-react';
import { FbPropsWithApi } from '../types';
import { FbAssetImage } from './FbAssetImage';

export interface UploadSuccessArgs {
  asset_id: string;
  file_name: string;
}

export interface FbFileUploadModalPropsBase extends FbPropsWithApi {
  onUploadSuccess: (info: UploadSuccessArgs) => void;
  onUploadError?: (err: string) => void;
}
export type FbFileUploadModalProps = PropsWithChildren<FbFileUploadModalPropsBase>;

export const defaultState = {
  data: null, // api result
  error: null, // any error on page or api
  stage: 'ready', // 'uploading'
  selectedFile: null,
  isOpen: false,
  progressPctg: 0,
};

export class FbFileUploadModal extends Component<FbFileUploadModalProps> {
  state = defaultState;
  
  openModal     = () => this.setState({ isOpen: true });
  closeModal    = () => this.setState({ isOpen: false });
  onClickCancel = () => { this.closeModal(); };
  onClickAttach = () => { this.closeModal(); }

  onChangeFile = ev => {
    const selectedFile = ev.target.files[0];
    this.setState({ selectedFile });
  }

  onUploadProgress = ({ loaded, total }) => {
    const progressPctg = Math.round(100.0 * loaded / total);
    this.setState({ progressPctg });
  }

  onClickUpload = async (ev) => {
    const { api, onUploadSuccess, onUploadError } = this.props;
    const { selectedFile } = this.state;
    try {
      this.setState({ error: null, data: null, stage: 'uploading', apiResult: null });
      if (!selectedFile) throw new Error('no file selected');
      const form = new FormData();
      form.append('fb_file', selectedFile);
      const uploadOptions = { onUploadProgress: this.onUploadProgress };
      const { data, error: uploadErr = null } = await api._upload(form, uploadOptions);
      if (uploadErr) {
        this.setState({ stage: 'ready', data, error: uploadErr });
        if (onUploadError) onUploadError(uploadErr);
        return;
      }
      const { asset_id, file_name, file_type, ...otherInfo } = data;
      const input = {
        id: asset_id,
        asset_type: 'image',
        media_type: file_type,
        label: 'image uploaded ' + (new Date()).toISOString(),
        url: file_name, // not full url 'uuid.jpg'
        meta: otherInfo,
      };
      const { data: assetIdCreated, error: createErr = null } = await api.asset_create(input);
      if (createErr) {
        this.setState({ stage: 'ready', data, error: createErr });
        if (onUploadError) onUploadError(createErr);
        return;
      }
      if (assetIdCreated === asset_id) {
        this.setState({ stage: 'ready', data, isOpen: false });
        if (onUploadSuccess) onUploadSuccess(data);
        return;
      }
      this.setState({ stage: 'ready', error: 'unknown error', isOpen: false });
      if (onUploadError) onUploadError('unknown error');
    } catch (err) {
      this.setState({ stage: 'ready', error: err.message });
    }
  }

  render() {
    const { stage, isOpen, data, error, progressPctg } = this.state;
    const { file_name = null } = data ?? {};
    let modalTrigger = (<Button type='button'>Attach photo</Button>);
    if (file_name) {
      modalTrigger = (<FbAssetImage asset={{ url: file_name }} w={128} h={96} wrapped={false} label={null} size='small' />)
    }
    
    const modalProps = {
      onClose: this.closeModal,
      onOpen: this.openModal,
      open: isOpen,
      closeOnEscape: false,
      closeOnDimmerClick: false,
      trigger: modalTrigger,
    };
    const disableUI = (stage !== 'ready');
    const message = (stage === 'ready') ? 'Please select an image to upload' : 'Uploading, please wait...';

    return (
      <Modal {...modalProps} size="small">
        <Header icon='image' content='Upload and attach a photo' />
        <Modal.Content>
          <Modal.Description>
            <p>{message}</p>
            <p><input type="file" name="fb_file" onChange={this.onChangeFile} disabled={disableUI} /></p>
            { stage === 'uploading' && (
              <Progress percent={progressPctg} progress color='purple' />
            )}
            { error && (
              <p>{error}</p>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.onClickCancel} color='black' disabled={disableUI}>Cancel</Button>
          <Button onClick={this.onClickUpload} color='purple' disabled={disableUI}>Upload</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
