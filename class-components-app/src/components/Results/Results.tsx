import "./results.css";
import React from 'react';
import CardList from "./CardList";
import type { Item } from "../../api/types";
import { fetchCharactersApi } from "../../api/characters";

type ResultsState = {
  items: Item[];
};

class ResultsSection extends React.Component<{}, ResultsState> {
  state: ResultsState = {
    items: [],
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem("search") || "";
    this.fetchCharacters(savedSearch);
  }

  private lastSearch = "";
  
  fetchCharacters = async (name: string) => {
    if (name.trim() === this.lastSearch) return;
    this.lastSearch = name.trim();

    try {
      const items = await fetchCharactersApi(name, 0);

      if (items) {
        this.setState({ items });
      }
    } catch (err) {
      console.error(err);
    }
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