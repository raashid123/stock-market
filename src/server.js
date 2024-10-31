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

// Route to fetch all stock data from two tables using a JOIN
app.get('/api/stocks', async (req, res) => {
  // Modify the query to fetch data from two tables (assuming stockdetail and companyessentials)
  const query = `
    SELECT 
      sd.company_name,sd.today_high,sd.low_price_target,sd.high_price_target,sd.mean_price_target,sd.yesterday_close,sd.yesterday_open,sd.week_52_high,sd.week_52_low,sd.current_price,sd.today_low,sd.today_high,sai.number_of_shares,sai.market_cap,sai.revenue,sai.dividend_yield,sai.pe_ratio,sai.eps
    FROM \stock-436809.stockdataset.stockdetail\ AS sd
    JOIN \stock-436809.stockdataset.companyessentials\ AS sai
    ON sd.company_name = sai.company_name
  `;

  try {
    const [rows] = await bigquery.query(query);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching data from BigQuery:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Route to fetch stock data by company name from two tables
app.get('/api/stocks/company/:companyName', async (req, res) => {
  const { companyName } = req.params;

  // Query BigQuery for stock details and additional info based on the company name
  const query = `
    SELECT 
      sd.company_name,sd.today_high,sd.low_price_target,sd.high_price_target,sd.mean_price_target,sd.yesterday_close,sd.yesterday_open,sd.week_52_high,sd.week_52_low,sd.current_price,sd.today_low,sd.today_high,sai.number_of_shares,sai.market_cap,sai.revenue,sai.dividend_yield,sai.pe_ratio,sai.eps
    FROM \stock-436809.stockdataset.stockdetail\ AS sd
    JOIN \stock-436809.stockdataset.companyessentials\ AS sai
    ON sd.company_name = sai.company_name
    WHERE LOWER(sd.company_name) = @companyName
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
  console.log('Server running on port ${port}');
});