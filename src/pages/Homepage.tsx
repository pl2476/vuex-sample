import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import request from '@/utils/request';

interface File {
  url: string;
  preview: unknown;
  originFileObj: Blob;
}

const getBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: File) => {
    const tempFile = file;
    if (!tempFile.url && !tempFile.preview) {
      tempFile.preview = await getBase64(tempFile.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = (data: { fileList: object }) => {
    const { fileList } = data;
    this.setState({ fileList });
  };

  test = () => {
    request('/proxy/system/user/list', {
      method: 'GET',
      params: {
        pageIndex: 1,
        pageSize: 10,
      },
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/proxy/system/user/uploadPicture"
          listType="picture-card"
          headers={{ Authorization: localStorage.getItem('auth') || '' }}
          fileList={fileList as UploadFile[]}
          onPreview={() => this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
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
