import React from 'react';
import { render } from 'react-dom';

import Router from './Components/Router';
import Footer from './Components/Footer';

render(<Router />, document.getElementById('root'));
render(<Footer />, document.getElementById('footer'));
