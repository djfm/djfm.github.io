/* breakpoints */

export const tinyScreenMax = '399px';

export const smallScreenMin = '400px';
export const smallScreenMax = '799px';

export const mediumScreenMin = '800px';
export const mediumScreenMax = '1199px';

export const largeScreenMin = '1200px';

/* colors */

export type ColorThemeStyle = 'dark' | 'light';

export type ColorTheme = {
  border: () => string;
  dark: (opacity?: number) => string;
  light: () => string;
  transparentLight: (opacity: number) => string;
  lightContrasting: (n?: number) => string;
  darkContrasting: (n?: number) => string;
}

export const makeColorTheme = (
  style: ColorThemeStyle = 'light',
): ColorTheme => {
  if (style === 'light') {
    return {
      border: () => '#bbb',
      dark: (opacity = 1) => `rgba(13,17,23,${opacity})`,
      light: () => '#fff',
      transparentLight: (opacity: number) =>
        `rgba(255, 255, 255, ${opacity})`,
      lightContrasting: (n = 0) => {
        if (n === 0) {
          return 'rgb(0,128,255)';
        }
        return 'rgb(255 92 28)';
      },
      darkContrasting: (n = 0) => {
        if (n === 0) {
          return 'rgb(255,166,87)';
        }
        return 'rgb(165, 210, 255)';
      },
    };
  }

  throw new Error('Invalid color theme');
};

export const defaultColorTheme = makeColorTheme('light');

/* dimensions */

export const spacing = {
  tiny: '0.35em',
  small: '0.7em',
  default: '1em',
  medium: '1.4em',
  large: '1.7em',
  xl: '2.5em',
  xxl: '4em',
  listPadding: undefined,
  headingMargins: [undefined] as string[],
  pLineHeight: undefined,
  pMargin: undefined,
};

spacing.pLineHeight = '1.7';
spacing.pMargin = spacing.medium;

spacing.headingMargins.push(spacing.large);
spacing.headingMargins.push(spacing.default);
spacing.headingMargins.push(spacing.small);
spacing.headingMargins.push(spacing.tiny);
spacing.headingMargins.push(spacing.tiny);
spacing.headingMargins.push(spacing.tiny);

export const fontSize = {
  default: '1.2em',
  headings: [
    undefined,
    '2.6em',
    '1.9em',
    '1.5em',
    '1.2em',
    '1.1em',
    '1em',
  ],
};
