# Driver-for-Hire App

A simple Node.js/Express app for ride requests and driver/passenger dashboards.

## Features

- User registration and login (driver or passenger)
- Passengers can request rides
- Drivers can view and accept pending ride requests
- Data stored in a local JSON file

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/driver-hire-app.git
   cd driver-hire-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Running the App

1. **Start the server:**
   ```sh
   node server.js
   ```

2. **Open your browser and go to:**
   ```
   http://localhost:3000
   ```

## Project Structure

- `server.js` - Express backend server
- `data/database.json` - Local JSON database
- `public/` - Frontend HTML, CSS, and JS files

## Notes

- All data is stored in `data/database.json`
- No authentication tokens are used (for demo/learning purposes)
- Make sure port 3000 is available

---

Enjoy using the Driver-for-Hire app!
