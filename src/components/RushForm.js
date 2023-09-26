import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import axios from 'axios';

const RushForm = ({ visible, onCancel, rushId, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      // Llenar el formulario con los datos actuales del rush si es necesario
      form.resetFields();
      if (rushId) {
        // Obtener los datos del rush actual
        axios.get(`https://api.duellinks.pro/rushes/${rushId}`)
          .then((response) => {
            const rushData = response.data;
            form.setFieldsValue({
              name: rushData.name.en,
              requirement: rushData.requirement.en,
              effect: rushData.effect.en,
            });
          })
          .catch((error) => {
            console.error('Error fetching rush data:', error);
          });
      }
    }
  }, [visible, rushId, form]);

  const handleUpdate = async () => {
    try {
      const formData = form.getFieldsValue();
      setLoading(true);
      await axios.put(`https://api.duellinks.pro/rushes/${rushId}`, formData);
      onUpdate();
    } catch (error) {
      console.error('Error updating rush:', error);
    } finally {
      setLoading(false);
      onCancel();
    }
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
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="requirement" label="Requirement">
          <Input />
        </Form.Item>
        <Form.Item name="effect" label="Effect">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RushForm;
