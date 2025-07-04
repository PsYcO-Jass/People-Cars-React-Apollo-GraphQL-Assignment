import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Button, Space, Form, Input, InputNumber, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DELETE_CAR, UPDATE_CAR, GET_PEOPLE } from '../queries';

const { Option } = Select;

const CarCard = ({ car, people }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  
  const [updateCar] = useMutation(UPDATE_CAR, {
    update(cache, { data: { updateCar } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      const updatedPeople = people.map(person => ({
        ...person,
        cars: person.cars.map(c => 
          c.id === updateCar.id ? updateCar : c
        ).filter(c => c.personId === person.id)
      }));
      
      // Add car to new person if personId changed
      const newPerson = updatedPeople.find(p => p.id === updateCar.personId);
      if (newPerson && !newPerson.cars.find(c => c.id === updateCar.id)) {
        newPerson.cars.push(updateCar);
      }
      
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: updatedPeople },
      });
    }
  });

  const [deleteCar] = useMutation(DELETE_CAR, {
    update(cache, { data: { deleteCar } }) {
      if (deleteCar) {
        const { people } = cache.readQuery({ query: GET_PEOPLE });
        const updatedPeople = people.map(person => ({
          ...person,
          cars: person.cars.filter(c => c.id !== car.id)
        }));
        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: updatedPeople },
        });
      }
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      year: car.year,
      make: car.make,
      model: car.model,
      price: car.price,
      personId: car.personId,
    });
  };

  const handleUpdate = async (values) => {
    try {
      await updateCar({
        variables: {
          id: car.id,
          year: values.year,
          make: values.make,
          model: values.model,
          price: values.price,
          personId: values.personId,
        },
        optimisticResponse: {
          updateCar: {
            ...car,
            year: values.year,
            make: values.make,
            model: values.model,
            price: values.price,
            personId: values.personId,
            person: people.find(p => p.id === values.personId),
            __typename: 'Car',
          },
        },
      });
      setIsEditing(false);
      message.success('Car updated successfully!');
    } catch (error) {
      message.error('Failed to update car');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCar({
        variables: { id: car.id },
        optimisticResponse: {
          deleteCar: true,
        },
      });
      message.success('Car deleted successfully!');
    } catch (error) {
      message.error('Failed to delete car');
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card 
      size="small"
      className="car-card"
      style={{ marginBottom: '8px' }}
      extra={
        !isEditing && (
          <Space>
            <Button 
              type="primary" 
              size="small"
              icon={<EditOutlined />} 
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button 
              type="primary" 
              danger 
              size="small"
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
        <div className="car-edit-form">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
          >
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: 'Please input year!' }]}
            >
              <InputNumber placeholder="Year" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="make"
              label="Make"
              rules={[{ required: true, message: 'Please input make!' }]}
            >
              <Input placeholder="Make" />
            </Form.Item>
            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: 'Please input model!' }]}
            >
              <Input placeholder="Model" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please input price!' }]}
            >
              <InputNumber
                placeholder="Price"
                style={{ width: '100%' }}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="personId"
              label="Person"
              rules={[{ required: true, message: 'Please select a person!' }]}
            >
              <Select placeholder="Select a person">
                {people.map(person => (
                  <Option key={person.id} value={person.id}>
                    {person.firstName} {person.lastName}
                  </Option>
                ))}
              </Select>
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
          <div><strong>{car.year} {car.make} {car.model}</strong></div>
          <div className="car-price">{formatPrice(car.price)}</div>
        </div>
      )}
    </Card>
  );
};

export default CarCard;
