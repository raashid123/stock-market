//SERVER.JS
const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());

// Correct path to your service account JSON key file
const keyFilePath = 'C:\\Users\\Asus\\Desktop\\stock\\stock\\src\\stock-436809-69ff084fb63b.json';

const bigquery = new BigQuery({
  keyFilename: keyFilePath,  // Provide the corrected path to the JSON key file
  projectId: 'stock-436809'  // Replace with your actual project ID
});

// Route to fetch all stock data
app.get('/api/stocks', async (req, res) => {
  const query = `SELECT * FROM \`stock-436809.stockdataset.stockdetail\``;

  try {
    const [rows] = await bigquery.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data from BigQuery:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to fetch stock data by company name
app.get('/api/stocks/company/:companyName', async (req, res) => {
  const { companyName } = req.params;

  // Query BigQuery for stock details based on the company name
  const query = `
    SELECT * 
    FROM \`stock-436809.stockdataset.stockdetail\`
    WHERE LOWER(company_name) = @companyName
  `;

  const options = {
    query: query,
    params: { companyName: companyName.toLowerCase() },  // Ensure the search is case-insensitive
  };

  try {
    const [rows] = await bigquery.query(options);
    if (rows.length > 0) {
      res.json(rows[0]);  // Return the first matching result
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    console.error('Error fetching data from BigQuery:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
