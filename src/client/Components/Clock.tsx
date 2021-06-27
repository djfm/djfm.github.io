import React, {
  useState,
  useEffect,
} from 'react';

import styled from 'styled-components';
import {
  brightColor,
} from './common/Styled';

const Wrapper = styled.div`
  color: ${brightColor};
`;

export const Clock: React.FC = () => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    weekday: 'short',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  }).format(new Date(timestamp));

  useEffect(() => {
    let shouldUpdate = true;

    const willUpdateClock = () => {
      const timeoutRef = setTimeout(() => {
        if (shouldUpdate) {
          setTimestamp(Date.now());
          willUpdateClock();
        }
      }, 1000);

      const cancel = () => {
        shouldUpdate = false;
        clearTimeout(timeoutRef);
      };

      return cancel;
    };

    return willUpdateClock();
  });

  const markup = (
    <Wrapper>
      [{formattedDate}]
    </Wrapper>
  );

  return markup;
};

export default Clock;
