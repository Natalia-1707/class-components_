import "./results.css";
import React from 'react';

class ResultsSection extends React.Component {
  render() {
    return (
        <section className="results-section">
            <h2>Results</h2>
            <div className="results-wrapper">
                <div className="results-header">
                    <div>Item Name</div>
                    <div>Item Description</div>
                </div>
                <div className="results-list"></div>
            </div>
            <button>Error</button>
        </section>
    )
  }
}
 
export default ResultsSection;