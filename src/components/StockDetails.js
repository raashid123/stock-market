import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import '../components/StockDetails.css';

const StockDetails = () => {
  const { companyName } = useParams();
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/stocks/company/${encodeURIComponent(companyName)}`);

        if (!response.ok) {
          throw new Error(`Error fetching stock details: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.company_name) {
          setStockDetails(data);
        } else {
          throw new Error('Company name not found in data');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [companyName]);

  if (loading) {
    return <div>Loading stock details...</div>;
  }

  if (error) {
    return <div>Error fetching stock details: {error}</div>;
  }

  // Construct the Power BI URL
  const powerBiUrl = `https://app.powerbi.com/reportEmbed?reportId=de902472-a03e-432c-93a8-74ea3700a1f4&autoAuth=true&ctid=813e6569-4e44-4d95-88a0-16a97bd5277c&filter=historicaldata/company_name eq '${encodeURIComponent(stockDetails.company_name)}'`;
  console.log("Power BI URL:", powerBiUrl); // Log the URL for debugging

  return (
    <div>
      <Navbar />
      {stockDetails ? (
        <div className="stock-details-container">
          <h1 className="company-name">{stockDetails.company_name || 'Company Name'}</h1>

          <div className="stock-details-grid">
            {/* Left Column: Price Summary and Buy/Sell Recommendations */}
            <div className="left-column">
              {/* Price Summary Section */}
              <div className="card price-summary">
                <h3>Price Summary:</h3>
                <div className="detail-row">
                  <div className="label-value">
                    <span className="label">TODAY'S HIGH:</span>
                    <span className="value">₹{stockDetails.today_high ?? 'N/A'}</span>
                  </div>
                  <div className="label-value">
                    <span className="label">TODAY'S LOW:</span>
                    <span className="value">₹{stockDetails.today_low ?? 'N/A'}</span>
                  </div>
                  <div className="label-value">
                    <span className="label">52 Week High:</span>
                    <span className="value">₹{stockDetails.week_52_high ?? 'N/A'}</span>
                  </div>
                  <div className="label-value">
                    <span className="label">52 Week Low:</span>
                    <span className="value">₹{stockDetails.week_52_low ?? 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Buy/Sell Recommendations Section */}
              <div className="card recommendations">
                <h3>Buy/Sell Recommendations:</h3>
                <div className="recommendation-grid">
                  <div className="label-value">
                    <span className="label">Current Price:</span>
                    <span className="value">
                      ₹{stockDetails.current_price ? stockDetails.current_price.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="label-value">
                    <span className="label">Mean Price Target:</span>
                    <span className="value">
                      ₹{stockDetails.mean_price_target ? stockDetails.mean_price_target.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="label-value">
                    <span className="label">High Price Target:</span>
                    <span className="value">
                      ₹{stockDetails.high_price_target ? stockDetails.high_price_target.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                  <div className="label-value">
                    <span className="label">Low Price Target:</span>
                    <span className="value">
                      ₹{stockDetails.low_price_target ? stockDetails.low_price_target.toFixed(2) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Company Essentials */}
            <div className="card company-essentials">
              <h2>Company Essentials:</h2>
              <div className="company-essentials-grid">
                <div className="label-value">
                  <span className="label">Market Cap:</span>
                  <span className="value">₹{stockDetails.market_cap ? stockDetails.market_cap.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="label-value">
                  <span className="label">No. of Shares:</span>
                  <span className="value">{stockDetails.number_of_shares ? stockDetails.number_of_shares.toFixed(2) : 'N/A'} </span>
                </div>
                <div className="label-value">
                  <span className="label">PE Ratio:</span>
                  <span className="value">{stockDetails.pe_ratio ? stockDetails.pe_ratio.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="label-value">
                  <span className="label">EPS:</span>
                  <span className="value">{stockDetails.eps ? stockDetails.eps.toFixed(2) : 'N/A'}</span>
                </div>
                <div className="label-value">
                  <span className="label">Dividend Yield:</span>
                  <span className="value">{stockDetails.dividend_yield ? stockDetails.dividend_yield.toFixed(2) : 'N/A'}%</span>
                </div>
                <div className="label-value">
                  <span className="label">Revenue:</span>
                  <span className="value">₹{stockDetails.revenue ? stockDetails.revenue.toFixed(2) : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Power BI Report for Stock Performance */}
            <div className="card powerbi-visualization">
              <h3>Stock Performance Visualization:</h3>
              <iframe
                title="stock"
                width="1140"
                height="565"
                src={powerBiUrl} // Use the correct variable name
                frameBorder="0"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div>No stock details found.</div>
      )}
    </div>
  );
};

export default StockDetails;
