import React from 'react';
import { useQuery } from '@apollo/client';
import { Spin, Alert } from 'antd';
import { GET_PEOPLE } from '../queries';
import PersonForm from './PersonForm';
import CarForm from './CarForm';
import PersonCard from './PersonCard';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <Alert message="Error loading data" description={error.message} type="error" />;

  const people = data?.people || [];

  return (
    <div>
      <div className="forms-container">
        <PersonForm />
        <CarForm />
      </div>
      
      <div>
        <h2>Records</h2>
        {people.length === 0 ? (
          <Alert message="No people found" type="info" />
        ) : (
          <div className="people-grid">
            {people.map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
