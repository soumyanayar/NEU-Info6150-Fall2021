import { useState } from 'react';

function Accordion({title, ingredients}) {
  const [isEntryOpen, setIsEntryOpen] = useState({});

  function toggleEntry(title) {
    setIsEntryOpen({
      ...isEntryOpen,
      [title]: !isEntryOpen[title],
    });
  }
  const isOpen = isEntryOpen[title];
  return (
    <div className="accordion">
          <div
            key={title}
            className={`accordion__entry ${isOpen ? 'accordion__entry--open' : '' }`}
          >
            <button
              className="accordion__title"
              onClick={ () => toggleEntry(title) }
            >
              Ingredients
            </button>
            <div className="accordion__body">
                <ol className="recipe-ingredients">
                    {ingredients.map((ingredient) => (
                        <li>{ingredient.text}</li>
                    ))}
                </ol>
            </div>  
          </div>
    </div>
  );
};
export default Accordion;