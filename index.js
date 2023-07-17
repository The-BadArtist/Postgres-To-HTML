const express = require('express');
const cors = require('cors');
const  { Client } =  require('pg');
const path = require('path');

const app = express();
const port = 3000;
const host = "localhost";

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "admin",
    database: "msipp_form"
});

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));



const middle = express.urlencoded({ 
    extended: false,
    parameterLimit: 17
    
})


client.on("connect", () => {
    console.log("Database connection"); 
})
 
client.on("end", () => {
    console.log("Connection end");
})


/**
 * Get data from the database to populate datalist for institutions
 */

app.get('/testing', (req, res) => {
    let listOfInstitution = [];
    const query = async () => {
        await client.connect();
        const dbData = await client.query(`SELECT DISTINCT institution FROM user_data ORDER BY institution ASC`);
        // console.log(dbData.rows);

        let institutionInfo = dbData.rows;
        Object.keys(institutionInfo).forEach((key, index) => {
            let institution = institutionInfo[key].institution
            listOfInstitution.push(institution);
        })
        // console.log(listOfInstitution)
        res.status(200).json({ institutionOption: listOfInstitution});


        client.end();
    }

    query();
})    

    
 

app.listen(port, () => {
    console.log(`App is listening at http://${host}:${port}`);
})