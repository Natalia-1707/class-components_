import React from "react";
import type { Item } from "../../api/types";

type Props = {
  items: Item[];
};

class CardList extends React.Component<Props> {
  render() {
    const { items } = this.props;

    return (
      <div className="results-list">
        {items.map((item) => (
          <div key={item.id} className="result-item">
            <div>{item.name}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default CardList;