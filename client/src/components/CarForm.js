import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Input, Button, Card, Select, InputNumber, message } from 'antd';
import { ADD_CAR, GET_PEOPLE } from '../queries';

const { Option } = Select;

const CarForm = () => {
  const [form] = Form.useForm();
  const { data: peopleData } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR, {
    update(cache, { data: { addCar } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      const updatedPeople = people.map(person => {
        if (person.id === addCar.personId) {
          return {
            ...person,
            cars: [...person.cars, addCar]
          };
        }
        return person;
      });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: updatedPeople },
      });
    }
  });

  const handleSubmit = async (values) => {
    try {
      await addCar({
        variables: {
          year: values.year,
          make: values.make,
          model: values.model,
          price: values.price,
          personId: values.personId,
        },
        optimisticResponse: {
          addCar: {
            id: `temp-${Date.now()}`,
            year: values.year,
            make: values.make,
            model: values.model,
            price: values.price,
            personId: values.personId,
            person: peopleData?.people?.find(p => p.id === values.personId),
            __typename: 'Car',
          },
        },
      });
      form.resetFields();
      message.success('Car added successfully!');
    } catch (error) {
      message.error('Failed to add car');
      console.error(error);
    }
  };

  const people = peopleData?.people || [];

  if (people.length === 0) {
    return null;
  }

  return (
    <Card title="Add Car" className="form-card">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
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
          <Button type="primary" htmlType="submit" block>
            Add Car
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CarForm;
