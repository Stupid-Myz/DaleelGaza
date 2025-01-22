# Daleel Gaza

**Daleel Gaza** is a crowd-powered SMS-based solution to broadcast resource availability in crisis zones like Gaza. It empowers residents to report and locate essential resources such as food, water, power, and shelter via SMS, reducing pressure on humanitarian aid centers.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Stupid-Myz/DaleelGaza.git
   cd DaleelGaza
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org) installed, then run:
   ```bash
   npm install
   ```

3. **Setup Firebase**:
   - Go to [Firebase Console](https://firebase.google.com/) and create your own project.
   - Obtain your Firebase configuration details (API key, project ID, etc.).
   - edit the `firebase.js` file in the `src` directory
     ```javascript
     import { initializeApp } from 'firebase/app';
     import { getDatabase } from 'firebase/database';

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID",
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);

     const database = getDatabase(app);

     export { database };
     ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   This will launch the React app at `http://localhost:3000`.

5. **Navigation**:
   - Admin page: `http://localhost:3000/admin`
   - User 1 page: `http://localhost:3000/screen1`
   - User 2 page: `http://localhost:3000/screen2`

## Credits

- **Team Members**:
  - Mohid Sheraz
  - Taha Mutahir
  - Karthik Joshy
  - Mohamed Mahdi

- **Technologies used**:
  - React.js for frontend
  - Firebase for database

## License

This project is licensed under the [MIT License](LICENSE).
