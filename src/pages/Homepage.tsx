import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
// import config from 'config/index';
import request from '@/utils/request';

// console.log(config);
const getBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

class PicturesWall extends React.PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'http://52.193.131.42:8885/group1/M00/00/00/rB8WI12jPIWAFLQaAAA1IQPnxCc484.png',
      },
    ],
    loading: false,
  };

  componentDidMount() {
    request('/system/user/list', {
      method: 'GET',
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: UploadFile) => {
    if (file.url) {
      this.setState({
        previewImage: file.url,
        previewVisible: true,
      });
    } else if (file.originFileObj) {
      this.setState({
        previewImage: await getBase64(file.originFileObj),
        previewVisible: true,
      });
    }
  };

  handleChange = (data: { fileList: UploadFile[] }) => {
    const { fileList } = data;
    // this.setState({ fileList });
    this.setState({ fileList: [...fileList] });
  };

  test = () => {
    request('/system/user/list', {
      method: 'GET',
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    });
  };

  customRequest = (option: { file: Blob }) => {
    // if (!data.file) {
    //   return false;
    // }
    if (option.file) {
      const formData = new FormData();
      formData.append('file', option.file);
      this.setState({
        loading: true,
      });
      request('/system/user/uploadPicture', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded',
          // Accept: 'application/json',
        },
      }).then(() => {
        const { fileList } = this.state;
        fileList.map(item => {
          if (item.status !== 'done') {
            item.status = 'done';
          }
          return item;
        });
        this.setState({
          fileList: [...fileList],
          loading: false,
        });
      });
    }
  };

  render() {
    const { previewVisible, previewImage, fileList, loading } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/system/user/uploadPicture"
          listType="picture-card"
          headers={{ Authorization: localStorage.getItem('auth') || '' }}
          fileList={fileList as UploadFile[]}
          onPreview={this.handlePreview}
          customRequest={this.customRequest}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        {/* <button type="button" onClick={this.test}>test</button> */}
      </div>
    );
  }
}

export default PicturesWall;
