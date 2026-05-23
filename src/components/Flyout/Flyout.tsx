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

  const handleDownload = () => {
    const headers = [
        'Name',
        'Description',
        'ID',
    ];

    const rows = selectedItems.map((item) => [
        item.name,
        item.description,
        item.id,
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map((row) =>
        row.map((value) => `"${value}"`).join(',')
        ),
    ].join('\n');

    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download =
        `${selectedItems.length}_items.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

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
            onClick={handleDownload}
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