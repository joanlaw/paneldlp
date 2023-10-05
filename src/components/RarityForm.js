import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

const RarityForm = ({ visible, onCancel, rushId, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = await form.validateFields();
      
      // Realiza la solicitud de actualización de rareza y limited aquí usando axios
      const response = await axios.put(`https://api.duellinks.pro/rushes/${rushId}`, {
        rarity: formData.rarity,
        limited: formData.limited, // Agrega el campo limited a la solicitud
      });

      // Llama a la función de actualización en el componente padre
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating rarity and limited:', error);
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Rarity and Limited"
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
          Update Rarity and Limited
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="rarity"
          label="Rarity"
          rules={[
            {
              required: true,
              message: 'Please input the rarity!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="limited"
          label="Limited"
          rules={[
            {
              required: true,
              message: 'Please input the limited value!',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RarityForm;
