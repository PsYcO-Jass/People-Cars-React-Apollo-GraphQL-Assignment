import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Spin, Alert, Card, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GET_PERSON_WITH_CARS } from '../queries';

const PersonShow = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id },
  });

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <Alert message="Error loading person" description={error.message} type="error" />;

  const person = data?.personWithCars;

  if (!person) {
    return <Alert message="Person not found" type="error" />;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <Link to="/" className="go-back-link">
        <Button icon={<ArrowLeftOutlined />} type="primary">
          GO BACK HOME
        </Button>
      </Link>
      
      <Card 
        title={`${person.firstName} ${person.lastName}`}
        style={{ marginTop: '20px' }}
      >
        <div>
          <h3>Cars:</h3>
          {person.cars && person.cars.length > 0 ? (
            person.cars.map(car => (
              <Card 
                key={car.id}
                size="small"
                style={{ marginBottom: '8px' }}
              >
                <div>
                  <div><strong>{car.year} {car.make} {car.model}</strong></div>
                  <div className="car-price">{formatPrice(car.price)}</div>
                </div>
              </Card>
            ))
          ) : (
            <Alert message="No cars found for this person" type="info" />
          )}
        </div>
      </Card>
    </div>
  );
};

export default PersonShow;
