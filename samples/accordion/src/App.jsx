import { useState } from 'react';
import Accordion from './Accordion';
import './app.css';

const defaultFAQs = {
  'What to do about a catnip addiction?': `
  Dolor voluptatum porro in repellendus optio tempora quam Omnis ea odio velit corrupti ipsa veritatis ex enim Asperiores mollitia excepturi maxime iste amet. Dignissimos alias eaque similique nemo unde Expedita!
  `,
  'Will I ever catch that red dot?': `
  Dolor dicta odio inventore ut qui dolorem. Omnis recusandae quo porro voluptatibus veniam? Sed earum rem nobis quasi odit, similique ducimus Voluptatibus fugit sint error?
  `,
  'Why does the human have a problem with me claiming the center of the bed?':`
  Amet minima assumenda debitis fugiat aut Illo adipisci accusantium totam est labore. Quam cum dolorum magni facere!
  `,

};

function App() {

  const [faqs] = useState(defaultFAQs);

  return (
    <div className="app">
      <Accordion entries={faqs}/>
    </div>
  );
}

export default App;
