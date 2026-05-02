import "./results.css";
import React from 'react';
import CardList from "./CardList";
import type { Item } from "../../api/types";
import { fetchCharactersApi } from "../../api/characters";

type ResultsState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

class ResultsSection extends React.Component<{}, ResultsState> {
  state: ResultsState = {
    items: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const savedSearch = localStorage.getItem("search") || "";
    this.fetchCharacters(savedSearch);
  }

  private lastSearch = "";
  
  fetchCharacters = async (name: string) => {
    if (name.trim() === this.lastSearch) return;
    this.lastSearch = name.trim();

    this.setState({ loading: true, items: [] });

    try {
      const items = await fetchCharactersApi(name, 0);

      if (!items) {
        this.setState({ error: "No data received from server" });
        return;
      }

      this.setState({ items });

    } catch (err) {
      this.setState({
        error: "Something went wrong :(\nPlease try again later.",
      });
    } finally {
      this.setState({ loading: false });
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
                {this.state.loading ? (
                  <div className="loading-div">Loading...</div>
                ) : this.state.error ? (
                  <div className="error-div">{this.state.error}</div>
                ) : (
                  <CardList items={this.state.items} />
                )}
            </div>
            <button>Error</button>
        </section>
    )
  }
}
 
export default ResultsSection;