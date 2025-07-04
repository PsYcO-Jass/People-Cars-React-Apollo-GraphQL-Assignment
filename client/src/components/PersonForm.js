import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Card, message } from 'antd';
import { ADD_PERSON, GET_PEOPLE } from '../queries';

const PersonForm = () => {
  const [form] = Form.useForm();
  const [addPerson] = useMutation(ADD_PERSON, {
    update(cache, { data: { addPerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people: [...people, addPerson] },
      });
    }
  });

  const handleSubmit = async (values) => {
    try {
      await addPerson({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        optimisticResponse: {
          addPerson: {
            id: `temp-${Date.now()}`,
            firstName: values.firstName,
            lastName: values.lastName,
            cars: [],
            __typename: 'Person',
          },
        },
      });
      form.resetFields();
      message.success('Person added successfully!');
    } catch (error) {
      message.error('Failed to add person');
      console.error(error);
    }
  };

  return (
    <Card title="Add Person" className="form-card">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
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
          <Button type="primary" htmlType="submit" block>
            Add Person
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PersonForm;
