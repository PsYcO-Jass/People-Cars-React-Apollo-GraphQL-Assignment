# People and Cars App

A full-stack web application built with React, Apollo Client, GraphQL, and Express.js to manage people and their cars.

## Features

- **CRUD Operations**: Create, Read, Update, Delete for both people and cars
- **Optimistic UI**: Changes are reflected immediately without waiting for server response
- **Responsive Design**: Built with Ant Design components for a modern look
- **Real-time Updates**: GraphQL subscriptions keep data in sync
- **Routing**: React Router for navigation between pages
- **Currency Formatting**: Proper display of car prices as currency

## Technology Stack

### Backend
- **Apollo Server** with Express.js
- **GraphQL** for API
- **UUID** for unique ID generation
- **CORS** for cross-origin requests

### Frontend
- **React** 18
- **Apollo Client** for GraphQL
- **React Router** for navigation
- **Ant Design** for UI components
- **Modern CSS** for styling

## Project Structure

```
people-cars-app/
├── server/                 # GraphQL server
│   ├── package.json
│   └── server.js
├── client/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── PersonForm.js
│   │   │   ├── CarForm.js
│   │   │   ├── PersonCard.js
│   │   │   ├── CarCard.js
│   │   │   └── PersonShow.js
│   │   ├── apollo-client.js
│   │   ├── queries.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd people-cars-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run install-deps
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

This will start both the server and client concurrently:
- Server: http://localhost:4000
- Client: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql

### Production Mode
```bash
npm start
```

## API Endpoints

### GraphQL Queries
- `people`: Get all people with their cars
- `person(id)`: Get a specific person
- `cars`: Get all cars
- `car(id)`: Get a specific car
- `personWithCars(id)`: Get a person with all their cars

### GraphQL Mutations
- `addPerson(firstName, lastName)`: Add a new person
- `updatePerson(id, firstName, lastName)`: Update a person
- `deletePerson(id)`: Delete a person (also deletes their cars)
- `addCar(year, make, model, price, personId)`: Add a new car
- `updateCar(id, year, make, model, price, personId)`: Update a car
- `deleteCar(id)`: Delete a car

## Features in Detail

### Person Management
- Add new people with first and last names
- Edit existing people inline
- Delete people (automatically removes their cars)
- View detailed person page with all cars

### Car Management
- Add cars with year, make, model, price, and owner
- Edit cars inline with dropdown to change owner
- Delete individual cars
- Automatic currency formatting for prices

### UI Features
- **Optimistic Updates**: Changes appear immediately
- **Form Validation**: Required field validation
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: User-friendly error messages
- **Loading States**: Spinners during data fetching

### Business Logic
- Cars are automatically removed when their owner is deleted
- Car ownership can be transferred between people
- Form validation ensures data integrity
- Currency formatting for all price displays

## Technical Requirements Met

✅ **CRUD Operations**: Complete CRUD for both people and cars
✅ **Optimistic UI**: All mutations use optimistic responses
✅ **Proper Routing**: Home page and person detail pages
✅ **Form Validation**: Required fields and proper data types
✅ **Currency Formatting**: All prices displayed as currency
✅ **Responsive Design**: Mobile-friendly layout
✅ **Error Handling**: Comprehensive error management
✅ **Code Quality**: Clean, maintainable code structure

## Development Notes

- The app uses Apollo Client's cache for state management
- Optimistic responses ensure smooth user experience
- All mutations properly update the cache
- Form validation prevents invalid data submission
- Currency formatting uses Intl.NumberFormat for consistency

## Future Enhancements

- Add search and filtering capabilities
- Implement user authentication
- Add image uploads for cars
- Add more detailed car information
- Implement pagination for large datasets
- Add data export functionality
