import "./search.css";
import React from 'react';

type State = {
  searchValue: string;
};

class SearchSection extends React.Component <{}, State> {
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
    localStorage.setItem("search", value);
  };

  render() {
    return (
      <section className="search-section">
          <form>
              <label htmlFor="search"></label>
              <input type="text" id="search"className="input" value={this.state.searchValue} onChange={this.handleChange}/>
          </form>
          <button>Search</button>
      </section>
    )
  }
} 

export default SearchSection;