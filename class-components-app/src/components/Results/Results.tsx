import "./results.css";
import React from 'react';
import CardList from "./CardList";
import type { Item } from "./types";

type ResultsState = {
  items: Item[];
};

class ResultsSection extends React.Component<{}, ResultsState> {
  state: ResultsState = {
    items: [
      {
        id: "1",
        name: "Jean-Luc Picard",
        description: "Captain of the USS Enterprise",
      },
      {
        id: "2",
        name: "Spock",
        description: "Science officer, half-Vulcan",
      },
      {
        id: "3",
        name: "James T. Kirk",
        description: "Captain of the USS Enterprise, famous for bold and risky decisions",
      },
      {
        id: "4",
        name: "Data",
        description: "Android officer aboard the USS Enterprise-D, стремится понять человечность",
      },
    ],
  };
  render() {
    return (
        <section className="results-section">
            <h2>Results</h2>
            <div className="results-wrapper">
                <div className="results-header">
                    <div>Item Name</div>
                    <div>Item Description</div>
                </div>
                <CardList items={this.state.items}/>
            </div>
            <button>Error</button>
        </section>
    )
  }
}
 
export default ResultsSection;