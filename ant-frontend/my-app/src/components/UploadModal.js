import React, { useState, useEffect } from 'react';
import { Modal, Button, Upload, Progress, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const UploadModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const handleOpenUploadDialog = () => {
      console.log("openUploadDialog event received");
      setIsModalVisible(true);
    };

    console.log("Adding event listener for openUploadDialog");
    window.addEventListener('openUploadDialog', handleOpenUploadDialog);

    // Cleanup to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('openUploadDialog', handleOpenUploadDialog);
    };
  }, []);

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status, percent } = info.file;
      if (status === 'uploading') {
        setUploadProgress(percent);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploadProgress(0); // Reset progress after upload is done
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setUploadProgress(0); // Reset progress on error
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Modal
      title="Upload File"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setIsModalVisible(false)}>
          Return
        </Button>,
      ]}
    >
      <Upload.Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Upload.Dragger>
      {uploadProgress > 0 && (
        <Progress percent={uploadProgress} />
      )}
    </Modal>
  );
};

export default UploadModal;
