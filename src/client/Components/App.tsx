import React from 'react';

import pages from '../../Pages';

console.log('Yay, pages!', pages.length);

const App: React.FC = () => {
  const x = 1 + 2;

  return (
    <div>
      <h1>Hello World {x}</h1>
    </div>
  );
};

export default App;
