/* 
   THIS SERVER IS MEANT TO BE RAN INSIDE EC2 INSTANCE, TO USE LIVE DB, use fetch(`http://ec2-15-222-3-80.ca-central-1.compute.amazonaws.com:3000/searchDestination/${term}`);
   IF THE SERVER IS NOT RUNNING, MESSAGE CHRIS OR LOG INTO THE EC2 INSTANCE AND RUN 'node index.js'
   To connect directly to the EC2 instance, run the following commands in the command line as administrator;
    ssh -i location_of_pem_file ec2-user@ec2-15-222-44-85.ca-central-1.compute.amazonaws.com - FOR PEM FILE, SEE TEAMS

    USE travelPlanner - for production db
    USE travelPlannerTest - for development db

   IF NETWORK ACCESS IS DENIED, SEND PUBLIC IP ADDRESS TO CHRIS TO BE ADDED TO THE SECURITY GROUP
   DATABASE 'host' and 'password' are hidden, see .ENV file
*/
const express = require('express');
const mysql = require('mysql');
// npm install express mysql

const app = express();
const port = 3000;
const cors = require('cors');

const db = mysql.createConnection({
    host: process.env.HOST_NAME,
	user: process.env.USER_NAME,
    password: process.env.DB_PASS,
    database: 'travelPlannerTest', // 'travelPlanner' for production 'travelPlannerTest' for development
    port: '3306'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
		throw err;
	}
	console.log('MySQL connected...');
});

// Middleware JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/searchDestination/:term', (req, res) => {
    const term = req.params.term;
    const query = "SELECT id FROM DESTINATIONS WHERE name LIKE ?";
    db.query(query, [`%${term}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error searching for destination.");
            throw err;
        }
        res.json(results);
    });
});

// get for searching DB tables.
app.get('/searchTour/:term', (req, res) => {
    const term = req.params.term;
    const query = "SELECT id FROM TOURS WHERE name LIKE ?";
    db.query(query, [`%${term}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error searching for tour.");
            throw err;
        }
        res.json(results);
    });
});

app.get('/searchPackage/:term', (req, res) => {
    const term = req.params.term;
    const query = "SELECT id FROM PACKAGES WHERE name LIKE ?";
    db.query(query, [`%${term}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error searching for package.");
            throw err;
        }
        res.json(results);
    });
});

app.get('/searchFlight/:term', (req, res) => {
    const term = req.params.term;
    const query = "SELECT id FROM FLIGHTS WHERE arriveLoc LIKE ?";
    db.query(query, [`%${term}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error searching for flight.");
            throw err;
        }
        res.json(results);
    });
});

app.get('/searchCoupon/:term', (req, res) => {
    const term = req.params.term;
    const query = "SELECT id FROM COUPONS WHERE name LIKE ?";
    db.query(query, [`%${term}%`], (err, results) => {
        if (err) {
            res.status(500).send("Error searching for coupon.");
            throw err;
        }
        res.json(results);
    });
});

// Listener
app.listen(port, () => {
    console.log("Server hosted at http://ec2-15-222-3-80.ca-central-1.compute.amazonaws.com:3000")
})