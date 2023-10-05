import React, { useState, useEffect } from 'react';
import { Modal, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const RushForm = ({ visible, onCancel, rushId, onUpdate }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (fileList.length > 0) {
        formData.append('image', fileList[0].originFileObj);
      }

      // Imprimir el FormData antes de enviarlo
      console.log('FormData antes de enviarlo:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      await axios.put(`https://api.duellinks.pro/rushes/${rushId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating rush:', error);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  const onFileChange = ({ fileList }) => {
    console.log('Lista de archivos después del cambio:', fileList);
    setFileList(fileList);
  };

  return (
    <Modal
      visible={visible}
      title="Edit Rush Card"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="update"
          type="primary"
          loading={loading}
          onClick={handleUpdate}
        >
          Update
        </Button>,
      ]}
    >
      <Upload
        beforeUpload={() => false} // Return false to not upload automatically
        listType="picture"
        fileList={fileList}
        onChange={onFileChange}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Modal>
  );
};

export default RushForm;
