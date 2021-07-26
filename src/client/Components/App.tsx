import React from 'react';

import Presenter from './ContentLayout/Presenter';
import StyledApp from './StyledApp';
// import SmallScreenMenu from './SmallScreen/Menu';

import pages from '../siteStructure';

const App: React.FC = () => {
  /*
  const [appDisplay, setAppDisplay] = useState<
  'hidden' | 'block'
  >('block');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.display = appDisplay;
      document.body.style.overflow = appDisplay === 'hidden'
        ? 'hidden' : 'auto';
    }
  }, [appDisplay]);

  const onMenuToggle = (open: boolean) => {
    if (open) {
      setAppDisplay('hidden');
    } else {
      setAppDisplay('block');
    }
  };

  const smallScreenMenu = (
    <SmallScreenMenu
      pages={pages}
      onMenuToggle={onMenuToggle}
    />
  );
  */
  const markup = (
    <StyledApp>
      <Presenter
        items={pages}
        parents={[]}
      />
    </StyledApp>
  );

  return markup;
};

export default App;
