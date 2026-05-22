import type { Item } from '../../api/types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleItem } from '../../store/selectedSlice';

type Props = {
  items: Item[];
};

function CardList({ items }: Props) {
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );
   return (
    <div className="results-list">
      {items.map((item) => (
        <div key={item.id} className="result-item">
          <input
            type="checkbox"
            className='checkbox'
            checked={selectedItems.some(
              (selected) => selected.id === item.id
            )}
            onChange={() => {
              dispatch(toggleItem(item));
            }}
          />
          <div>{item.name}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  )
}

export default CardList;
