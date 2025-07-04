# People and Cars App - React + Apollo + GraphQL

**Student Assignment: Advanced Topics in Web Development**

A full-stack web application built with React, Apollo Client, GraphQL, and Express.js to manage people and their cars with complete CRUD operations.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend GraphQL API**: http://localhost:4000/graphql
- **GraphQL Playground**: http://localhost:4000/graphql

## 📋 Assignment Requirements Met

### ✅ **Technical Requirements**
- [x] **React Frontend** with Apollo Client
- [x] **GraphQL Server** with Apollo Server + Express
- [x] **Complete CRUD Operations** for both People and Cars
- [x] **Optimistic UI** - Changes reflect immediately
- [x] **React Router** for navigation (Home `/` and Person Detail `/people/:id`)
- [x] **Ant Design** for modern UI components
- [x] **Currency Formatting** for all car prices
- [x] **Form Validation** with required fields
- [x] **Responsive Design** that works on all devices

### ✅ **Business Logic**
- [x] **Person Management**: Add, Edit, Delete people
- [x] **Car Management**: Add, Edit, Delete cars with owner selection
- [x] **Automatic Deletion**: When person is deleted, their cars are also deleted
- [x] **Owner Transfer**: Cars can be transferred between people
- [x] **Dynamic Forms**: Car form hidden when no people exist
- [x] **Nested Display**: Cars displayed as sub-cards within person cards

### ✅ **UI/UX Features**
- [x] **Person Cards**: Display with Edit/Delete buttons and "Learn More" link
- [x] **Car Cards**: Nested display with year, make, model, and formatted price
- [x] **Inline Editing**: Click Edit to transform display into editable form
- [x] **Show Page**: Separate page for person details with "Go Back Home" link
- [x] **Centered Layout**: Forms and headings properly centered
- [x] **Professional Styling**: Modern, clean design with proper spacing

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
