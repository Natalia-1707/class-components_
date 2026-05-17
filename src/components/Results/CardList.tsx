import type { Item } from '../../api/types';

type Props = {
  items: Item[];
};

function CardList({ items }: Props) {
  return (
    <div className="results-list">
      {items.map((item) => (
        <div key={item.id} className="result-item">
          <div>{item.name}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  )
}

export default CardList;