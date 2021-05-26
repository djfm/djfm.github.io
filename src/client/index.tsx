import React from 'react';
import { render } from 'react-dom';

const Hello = () => (
  <div>Hello from react!</div>
);

render(<Hello />, document.getElementById('root'));
