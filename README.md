# 🚖 Driver-for-Hire Aggregator App

A beginner-friendly *Node.js + Express* application that simulates a ride-hailing platform, enabling drivers and passengers to interact through a simple web interface.

## 📽 Demo Video

 [Watch the demo video](# link of video) 


## ✨ Features

- 👤 User registration & login (Driver / Passenger)
- 🧭 Passenger dashboard: Request a ride
- 🧑‍✈ Driver dashboard: View & accept ride requests
- 🗃 Local JSON database for quick prototyping
- 🎓 Beginner-friendly, no authentication tokens


## 🛠 Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Frontend    | HTML, CSS, JavaScript |
| Backend     | Node.js, Express.js  |
| Database    | JSON File (Mock DB)  |
| Hosting     | Localhost (port 3000)|


## 📦 Installation

1. *Clone the repository:*
   bash
   git clone https://github.com/MasterRohitPatil/Driver-for-Hire-Aggregator-App.git
   cd Driver-for-Hire-Aggregator-App

2. **Install dependencies:**
   sh
   npm install
   

## Running the App

1. **Start the server:**
   sh
   node server.js
   

2. **Open your browser and go to:**
   
   http://localhost:3000
   ```

Driver-for-Hire-Aggregator-App/
├── data/
│   └── database.json       # Local storage
├── public/
│   ├── index.html          # Login / Register page
│   ├── passenger.html      # Passenger dashboard
│   ├── driver.html         # Driver dashboard
│   └── styles.css          # Basic styling
├── server.js               # Express backend
├── package.json
└── README.md

##📝 Notes
No authentication tokens or encryption used — for learning/demo purposes only
Port 3000 should be free before starting the server
To clear all ride/user data, you can manually reset data/database.json

Enjoy using the Driver-for-Hire Aggregator App!
