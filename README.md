# ClubRecipee

ClubRecipee is a community-driven recipe sharing web application that allows users to create, share, review, and explore recipes in an intuitive and secure environment. Built with a full-stack JavaScript approach, the project integrates Express.js, MongoDB, EJS, Passport.js, and Cloudinary to deliver a rich user experience across devices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API & Routes](#api--routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Appendices](#appendices)

---

## Overview

ClubRecipee is designed to provide a platform for culinary enthusiasts to share and discover new recipes. The application supports secure user authentication, dynamic content creation, and real-time feedback through reviews and flash messages. Advanced image handling is enabled via Cloudinary, ensuring recipes are visually appealing and engaging.

---

## Features

- **User Authentication:**  
  - Secure registration and login using Passport.js.
  - Session management with express-session and connect-mongo.
- **Recipe Management:**  
  - Create, edit, view, and delete recipes.
  - Add multiple images per recipe using Cloudinary integration.
- **Review System:**  
  - Users can leave reviews on recipes.
  - Only authorized users (creators) can delete their reviews.
- **Responsive Design:**  
  - Fully responsive interface built using Bootstrap to ensure usability on mobile, tablet, and desktop.
- **Robust Error Handling:**  
  - Middleware for handling errors, validation, and feedback through flash messages.
- **Scalable Data Storage:**  
  - MongoDB used for storing recipes, user profiles, and session data.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (or use [Mongo Atlas](https://docs.atlas.mongodb.com/getting-started/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repository-url.git
   cd ClubRecipee

   Below is a detailed GitHub README.md file for your project. You can copy and paste this directly into your repository.

```markdown
# ClubRecipee

ClubRecipee is a community-driven recipe sharing web application that allows users to create, share, review, and explore recipes in an intuitive and secure environment. Built with a full-stack JavaScript approach, the project integrates Express.js, MongoDB, EJS, Passport.js, and Cloudinary to deliver a rich user experience across devices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [API & Routes](#api--routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Appendices](#appendices)

---

## Overview

ClubRecipee is designed to provide a platform for culinary enthusiasts to share and discover new recipes. The application supports secure user authentication, dynamic content creation, and real-time feedback through reviews and flash messages. Advanced image handling is enabled via Cloudinary, ensuring recipes are visually appealing and engaging.

---

## Features

- **User Authentication:**  
  - Secure registration and login using Passport.js.
  - Session management with express-session and connect-mongo.
- **Recipe Management:**  
  - Create, edit, view, and delete recipes.
  - Add multiple images per recipe using Cloudinary integration.
- **Review System:**  
  - Users can leave reviews on recipes.
  - Only authorized users (creators) can delete their reviews.
- **Responsive Design:**  
  - Fully responsive interface built using Bootstrap to ensure usability on mobile, tablet, and desktop.
- **Robust Error Handling:**  
  - Middleware for handling errors, validation, and feedback through flash messages.
- **Scalable Data Storage:**  
  - MongoDB used for storing recipes, user profiles, and session data.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (or use [Mongo Atlas](https://docs.atlas.mongodb.com/getting-started/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repository-url.git
   cd ClubRecipee
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a .env file in the root of your project based on the sample below:

   ```properties
   MONGODB_URI_DEV=mongodb://localhost:27017/club-recipee
   MONGODB_URI_PROD=your-mongodb-atlas-connection-string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SESSION_SECRET=thisshouldbeabettersecret!
   NODE_ENV=development
   PORT=3000
   ```

### Running Locally

Start the development server with:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

The app uses a .env file to manage sensitive data such as database connection strings, Cloudinary credentials, and session secrets. Ensure your .env file is updated with valid values.

---

## Project Structure

```plaintext
ClubRecipee/
├── controllers/
│   ├── recipes.js     # Recipe-related operations (CRUD, image uploads)
│   └── users.js       # User authentication and account management
├── models/
│   ├── recipe.js      # Mongoose schema for recipes
│   ├── reviews.js     # Mongoose schema for reviews
│   └── user.js        # Mongoose schema for user accounts
├── public/            # Static assets (CSS, JS, images)
├── routes/
│   ├── recipes.js     # Routing for recipe endpoints
│   ├── reviews.js     # Routing for review endpoints
│   └── users.js       # Routing for user authentication endpoints
├── views/
│   ├── partials/      # EJS partials (navbar, footer, etc.)
│   ├── recipes/       # Recipe-related views (index, new, details, edit)
│   └── users/         # User-related views (login, register)
├── .env               # Environment configuration file
├── app.js             # Main application file
├── package.json
└── README.md          # Project documentation
```

---

## Dependencies

Here are some of the key dependencies used in this project:

- **Express.js:** [https://expressjs.com/](https://expressjs.com/)
- **MongoDB:** [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Mongoose:** [https://mongoosejs.com/](https://mongoosejs.com/)
- **EJS:** [https://ejs.co/](https://ejs.co/)
- **Passport.js:** [https://www.passportjs.org/](https://www.passportjs.org/)
- **Connect-Flash:** [https://github.com/jaredhanson/connect-flash](https://github.com/jaredhanson/connect-flash)
- **Express-Session:** [https://github.com/expressjs/session](https://github.com/expressjs/session)
- **Connect-Mongo:** [https://github.com/jdesboeufs/connect-mongo](https://github.com/jdesboeufs/connect-mongo)
- **Method-Override:** [https://github.com/expressjs/method-override](https://github.com/expressjs/method-override)
- **Dotenv:** [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)
- **Cloudinary:** [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Multer:** [https://github.com/expressjs/multer](https://github.com/expressjs/multer)
- **Multer-Storage-Cloudinary:** [https://www.npmjs.com/package/multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
- **Vercel:** [https://vercel.com/docs](https://vercel.com/docs)

---

## API & Routes

The application exposes routes for handling recipes, reviews, and user authentication. Some of the key routes include:

- **Recipes:**
  - `GET /recipes` - View all recipes.
  - `GET /recipes/new` - Display form for a new recipe.
  - `POST /recipes` - Create a new recipe.
  - `GET /recipes/:id` - View details of a specific recipe.
  - `GET /recipes/:id/edit` - Display form to edit a recipe.
  - `PUT /recipes/:id` - Edit an existing recipe.
  - `DELETE /recipes/:id` - Delete a recipe.

- **Reviews:**
  - `POST /recipes/:id/reviews` - Create a new review for a recipe.
  - `DELETE /recipes/:id/reviews/:reviewId` - Delete a review.

- **Users:**
  - `GET /register` - Show registration form.
  - `POST /register` - Register a new user.
  - `GET /login` - Show login form.
  - `POST /login` - Log in a user.
  - `GET /logout` - Log out the user.

Refer to the inline documentation in the controller files for further details on each route's functionality.

---

## Deployment

ClubRecipee can be deployed on Vercel or any other Node.js hosting platform. For Vercel deployment:

1. Push your repository to GitHub.
2. Follow [Vercel’s setup guide](https://vercel.com/docs) to import your GitHub repository.
3. Set up your environment variables on Vercel as per your local .env file.
4. Deploy the project and monitor logs for any issues.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Open a pull request detailing your changes and improvements.

Please follow the established code style and ensure that your changes are covered by tests if needed.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Appendices

Additional supplementary materials such as detailed project reports, diagrams, weekly progress logs, and AI tool usage prompts (listed in the Appendices) can be found in the `/docs` directory of this repository.

---

ClubRecipee is a comprehensive project that demonstrates practical applications of modern web development techniques and best practices. Enjoy exploring and contributing to the project!
```
