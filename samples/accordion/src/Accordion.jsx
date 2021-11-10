import { useState } from 'react';

function Accordion({ entries }) {
  const [isEntryOpen, setIsEntryOpen] = useState({});

  function toggleEntry(title) {
    setIsEntryOpen({
      ...isEntryOpen,
      [title]: !isEntryOpen[title],
    });
  }

  return (
    <div className="accordion">
      { Object.keys(entries).map( title => {
        const isOpen = isEntryOpen[title];
        return (
          <div
            key={title}
            className={`accordion__entry ${isOpen ? 'accordion__entry--open' : '' }`}
          >
            <button
              className="accordion__title"
              onClick={ () => toggleEntry(title) }
            >
              {title}
            </button>
            <div className="accordion__body">{entries[title]}</div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
