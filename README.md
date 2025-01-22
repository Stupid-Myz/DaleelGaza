# Daleel Gaza

**Daleel Gaza** is a crowd-powered SMS-based solution to broadcast resource availability in crisis zones like Gaza. It empowers residents to report and locate essential resources such as food, water, power, and shelter via SMS, reducing pressure on humanitarian aid centers.

As we do not have access to SMS services, we decided to replicate how an SMS app would work.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/daleel-gaza.git
   cd daleel-gaza
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org) installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will launch the React app at `http://localhost:3000`.

4. **Backend setup**:
   - Ensure Python 3.x is installed.
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the backend server:
     ```bash
     python app.py
     ```

## Testing the Project

1. Open the React frontend in your browser (`http://localhost:3000`).
2. Use the SMS interface in the app (or a mock service) to send and retrieve resource updates.
3. Verify backend responses via the terminal or logs.

## Credits

- **Team Members**:
  - Taha Mutahir
  - Karthik Joshy
  - Mohid Sheraz
  - Mohamed Mehdi

- **Technologies used**:
  - React.js for frontend
  - Python and Firebase for backend
  - Twilio for SMS gateway integration

## License

This project is licensed under the [MIT License](LICENSE).
