import React, {
  useEffect,
  useState,
  ImgHTMLAttributes,
} from 'react';

import styled from 'styled-components';

import {
  defaultColorTheme as colors,
  spacing,
} from '../theme';

const SmallViewContainer = styled.div`
  img {
    display: block;
    max-width: 100%;
    margin-bottom: ${spacing.tiny}
  }
`;

const LargeViewContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 100;

  background-color: ${colors.light()};

  > div {
    padding: ${spacing.default};
    max-width: calc(100vw - 2 * ${spacing.default});
  }

  .img-container {
    overflow: auto;
    margin-bottom: ${spacing.medium};
  }

  img {
    display: block;
  }
`;

export type ImgProps = React.PropsWithChildren<
 ImgHTMLAttributes<HTMLImageElement>
>;

export const Img: React.FC<ImgProps> = ({
  alt,
  src,
  ...props
}) => {
  const [viewLarger, setViewLarger] = useState(false);
  const [overflowStyle, setOverflowStyle] = useState<string>('auto');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (viewLarger) {
        const { overflow } = window
          .getComputedStyle(document.body);

        setOverflowStyle(overflow);

        document.body.style.overflow = 'hidden';

        const reset = () => {
          document.body.style.overflow = overflow;
        };

        return reset;
      }

      document.body.style.overflow = overflowStyle;
    }

    return () => null;
  }, [viewLarger, overflowStyle]);

  const viewLargerClicked = () => {
    setViewLarger(true);
  };

  const closeLargerViewClicked = () => {
    setViewLarger(false);
  };

  const img = (
    <img
      alt={alt}
      src={src}
      {...props}
    />
  );

  const smallView = (
    <SmallViewContainer>
      {img}
      <button
        onClick={viewLargerClicked}
        type="button"
      >
        voir en grand
      </button>
    </SmallViewContainer>
  );

  const largerView = (
    <LargeViewContainer>
      <div>
        <div className="img-container">
          {img}
        </div>
        <button
          onClick={closeLargerViewClicked}
          type="button"
        >
          fermer l&apos;image
        </button>
      </div>
    </LargeViewContainer>
  );

  return viewLarger ? largerView : smallView;
};

export default Img;
