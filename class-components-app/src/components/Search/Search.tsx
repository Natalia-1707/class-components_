import "./search.css";
import React from 'react';
import type { Props } from "../../api/types";

type State = {
  searchValue: string;
};

class SearchSection extends React.Component <Props, State> {
    state: State = {
    searchValue: '',
  };

  componentDidMount() {
  const savedValue = localStorage.getItem('search');

  if (savedValue) {
    this.setState({ searchValue: savedValue });
    }
  }

   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ searchValue: value });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = this.state.searchValue.trim();
    const saved = localStorage.getItem("search") || "";

    if (trimmed === saved) return;

    localStorage.setItem("search", trimmed);
    console.log(localStorage)
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <section className="search-section">
          <form onSubmit={this.handleSubmit}>
              <label htmlFor="search"></label>
              <input type="text" id="search"className="input" value={this.state.searchValue} onChange={this.handleChange}/>
              <button type="submit">Search</button>
          </form>
      </section>
    )
  }
} 

export default SearchSection;