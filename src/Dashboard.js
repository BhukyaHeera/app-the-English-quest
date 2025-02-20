import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { auth } from '../src/firebase';
import { signOut } from 'firebase/auth';

const { Option } = Select;

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);

    fetchUsers();
  };

  const handleSubmit = async (values) => {
    if (editingUser) {
        await axios.put(`http://localhost:5000/users/${editingUser._id}`, values);

    } else {
      await axios.post('http://localhost:5000/users', values);
    }
    fetchUsers();
    setModalVisible(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const columns = [
    { title: 'Sn No', dataIndex: '_id', key: '_id' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditUser(record)}>Edit</Button>
          <Button onClick={() => handleDeleteUser(record._id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout} style={{ float: 'right' }}>Logout</Button>
      <Button type="primary" onClick={handleAddUser} icon={<PlusOutlined />}>Add User</Button>
      <Table dataSource={users} columns={columns} rowKey="_id" />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="firstName" label="First Name" > <Input /> </Form.Item>
          <Form.Item name="lastName" label="Last Name" > <Input /> </Form.Item>
          <Form.Item name="email" label="Email" > <Input /> </Form.Item>
          <Form.Item name="status" label="Status" > 
            <Select> <Option value="Active">Active</Option> <Option value="Inactive">Inactive</Option> </Select> 
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Dashboard;