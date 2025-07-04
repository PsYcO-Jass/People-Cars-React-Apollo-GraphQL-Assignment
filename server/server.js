const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Sample data
let people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
];

let cars = [
  {
    id: '1',
    year: 2019,
    make: 'Toyota',
    model: 'Corolla',
    price: 40000,
    personId: '1'
  },
  {
    id: '2',
    year: 2018,
    make: 'Lexus',
    model: 'LX 600',
    price: 13000,
    personId: '1'
  },
  {
    id: '3',
    year: 2017,
    make: 'Honda',
    model: 'Civic',
    price: 20000,
    personId: '1'
  },
  {
    id: '4',
    year: 2019,
    make: 'Acura',
    model: 'MDX',
    price: 60000,
    personId: '2'
  },
  {
    id: '5',
    year: 2018,
    make: 'Ford',
    model: 'Focus',
    price: 35000,
    personId: '2'
  },
  {
    id: '6',
    year: 2017,
    make: 'Honda',
    model: 'Pilot',
    price: 45000,
    personId: '2'
  },
  {
    id: '7',
    year: 2019,
    make: 'Volkswagen',
    model: 'Golf',
    price: 40000,
    personId: '3'
  },
  {
    id: '8',
    year: 2018,
    make: 'Kia',
    model: 'Sorento',
    price: 45000,
    personId: '3'
  },
  {
    id: '9',
    year: 2017,
    make: 'Volvo',
    model: 'XC40',
    price: 55000,
    personId: '3'
  }
];

// GraphQL schema
const typeDefs = `
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]!
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
    person: Person!
  }

  type Query {
    people: [Person]!
    person(id: ID!): Person
    cars: [Car]!
    car(id: ID!): Car
    personWithCars(id: ID!): Person
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person!
    updatePerson(id: ID!, firstName: String!, lastName: String!): Person!
    deletePerson(id: ID!): Boolean!
    
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car!
    updateCar(id: ID!, year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car!
    deleteCar(id: ID!): Boolean!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    people: () => people,
    person: (parent, args) => people.find(person => person.id === args.id),
    cars: () => cars,
    car: (parent, args) => cars.find(car => car.id === args.id),
    personWithCars: (parent, args) => people.find(person => person.id === args.id)
  },
  
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id)
  },
  
  Car: {
    person: (parent) => people.find(person => person.id === parent.personId)
  },
  
  Mutation: {
    addPerson: (parent, args) => {
      const newPerson = {
        id: uuidv4(),
        firstName: args.firstName,
        lastName: args.lastName
      };
      people.push(newPerson);
      return newPerson;
    },
    
    updatePerson: (parent, args) => {
      const personIndex = people.findIndex(person => person.id === args.id);
      if (personIndex === -1) {
        throw new Error('Person not found');
      }
      
      people[personIndex] = {
        ...people[personIndex],
        firstName: args.firstName,
        lastName: args.lastName
      };
      
      return people[personIndex];
    },
    
    deletePerson: (parent, args) => {
      const personIndex = people.findIndex(person => person.id === args.id);
      if (personIndex === -1) {
        return false;
      }
      
      // Delete all cars belonging to this person
      cars = cars.filter(car => car.personId !== args.id);
      
      // Delete the person
      people.splice(personIndex, 1);
      return true;
    },
    
    addCar: (parent, args) => {
      const newCar = {
        id: uuidv4(),
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      };
      cars.push(newCar);
      return newCar;
    },
    
    updateCar: (parent, args) => {
      const carIndex = cars.findIndex(car => car.id === args.id);
      if (carIndex === -1) {
        throw new Error('Car not found');
      }
      
      cars[carIndex] = {
        ...cars[carIndex],
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      };
      
      return cars[carIndex];
    },
    
    deleteCar: (parent, args) => {
      const carIndex = cars.findIndex(car => car.id === args.id);
      if (carIndex === -1) {
        return false;
      }
      
      cars.splice(carIndex, 1);
      return true;
    }
  }
};

async function startServer() {
  const app = express();
  
  // Enable CORS
  app.use(cors());
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });
  
  await server.start();
  server.applyMiddleware({ app });
  
  const PORT = process.env.PORT || 4000;
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});
