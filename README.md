# Food Delivery App

A food delivery application built with React, Redux, and Firebase. The app allows users to browse a menu, add meals to their cart, and place orders. It leverages Firebase for data storage and real-time updates.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: State management library used for managing the application state.
- **Redux Toolkit**: Simplifies Redux setup and reduces boilerplate code.
- **TypeScript**: Superset of JavaScript that provides optional static typing, improving development productivity and reliability.
- **Firebase**: A platform for developing web and mobile applications, used here for database storage and real-time data updates.
- **Zod**: A TypeScript-first schema validation library for input validation.
- **Tailwind CSS**: A utility-first CSS framework for designing custom and responsive UIs.

## Features

- **Meal Catalog**: Display a list of available meals with their details and prices.
- **Cart Management**: Users can add meals to their cart, update quantities, and remove items.
- **Order Creation**: After selecting meals, users can place an order by providing necessary information.
- **Input Validation**: Ensures that the user submits valid data, such as valid email addresses, through Zod validation schemas.
- **Responsive Design**: The app is fully responsive and works seamlessly on various devices, thanks to Tailwind CSS.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/nadiia-dev/food-delivery-app.git
```

2. Install the dependencies:

```bash
  cd food-delivery-app
  npm install
```

3. Set up your Firebase project:

- Create a Firebase project at Firebase Console.
- Set up Firebase Firestore or Realtime Database (depending on your configuration).
- Get your Firebase config and create a .env file in the root directory with content similar to the .env.example file.

4. Run the development server:

```bash
    npm run dev
```

5. Open the application in your browser at http://localhost:5173.

## Deployment

Application deployed using Vercel
