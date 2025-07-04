import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Card, Button, Space, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DELETE_PERSON, UPDATE_PERSON, GET_PEOPLE } from '../queries';
import CarCard from './CarCard';

const PersonCard = ({ person }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { data: peopleData } = useQuery(GET_PEOPLE);
  
  const [updatePerson] = useMutation(UPDATE_PERSON, {
    update(cache, { data: { updatePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      const updatedPeople = people.map(p => 
        p.id === updatePerson.id ? updatePerson : p
      );
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: updatedPeople },
      });
    }
  });

  const [deletePerson] = useMutation(DELETE_PERSON, {
    update(cache, { data: { deletePerson } }) {
      if (deletePerson) {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: people.filter(p => p.id !== person.id) },
        });
      }
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      firstName: person.firstName,
      lastName: person.lastName,
    });
  };

  const handleUpdate = async (values) => {
    try {
      await updatePerson({
        variables: {
          id: person.id,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        optimisticResponse: {
          updatePerson: {
            ...person,
            firstName: values.firstName,
            lastName: values.lastName,
            __typename: 'Person',
          },
        },
      });
      setIsEditing(false);
      message.success('Person updated successfully!');
    } catch (error) {
      message.error('Failed to update person');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePerson({
        variables: { id: person.id },
        optimisticResponse: {
          deletePerson: true,
        },
      });
      message.success('Person deleted successfully!');
    } catch (error) {
      message.error('Failed to delete person');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <Card 
      title={`${person.firstName} ${person.lastName}`}
      className="person-card"
      extra={
        !isEditing && (
          <Space>
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button 
              type="primary" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Space>
        )
      }
    >
      {isEditing ? (
        <div className="person-edit-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please input last name!' }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <strong>Cars:</strong>
          </div>
          {person.cars && person.cars.length > 0 ? (
            person.cars.map(car => (
              <CarCard key={car.id} car={car} people={peopleData?.people || []} />
            ))
          ) : (
            <p>No cars</p>
          )}
          <Link to={`/people/${person.id}`} className="learn-more-link">
            Learn More
          </Link>
        </div>
      )}
    </Card>
  );
};

export default PersonCard;
