import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearItems } from '../../store/selectedSlice';

function Flyout() {
  const dispatch = useDispatch();

  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="flyout-div">
      <span className='selected-items-number'>
        Selected: {selectedItems.length}
      </span>
      <div className='flyout-buttons-div'>
        <button
            className="flyout-button"
            onClick={() => dispatch(clearItems())}
            aria-label="Unselect all"
            >
            <span className="material-symbols-outlined flyout-icons">
                delete_sweep
            </span>
        </button>

        <button
            className="flyout-button"
            aria-label="Download selected items"
            >
            <span className="material-symbols-outlined flyout-icons">
                download
            </span>
        </button>
      </div>
    </div>
  );
}

export default Flyout;