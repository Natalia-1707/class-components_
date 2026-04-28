import "./search.css";
import React from 'react';

class SearchSection extends React.Component {
  render() {
    return (
      <section className="search-section">
          <form>
              <label htmlFor="search"></label>
              <input type="text" id="search"className="input"/>
          </form>
          <button>Search</button>
      </section>
    )
  }
} 

export default SearchSection;