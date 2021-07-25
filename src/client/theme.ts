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
  dark: () => string;
  light: () => string;
  lightContrasting: (n?: number) => string;
  darkContrasting: (n?: number) => string;
}

export const makeColorTheme = (
  style: ColorThemeStyle = 'light',
): ColorTheme => {
  if (style === 'light') {
    return {
      dark: () => '#0d1117',
      light: () => '#fff',
      lightContrasting: () => 'rgb(0,128,255)',
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
  tiny: '0.25em',
  small: '0.5em',
  default: '0.8em',
  medium: '1.2em',
  large: '1.5em',
  headingMargins: [undefined] as string[],
};

spacing.headingMargins.push(spacing.medium);
spacing.headingMargins.push(spacing.default);
spacing.headingMargins.push(spacing.small);
spacing.headingMargins.push(spacing.tiny);
spacing.headingMargins.push(spacing.tiny);
spacing.headingMargins.push(spacing.tiny);

export const fontSize = {
  default: '1rem',
  headings: [
    undefined,
    '2.5rem',
    '2rem',
    '1.5rem',
    '1.2rem',
    '1.1rem',
    '1rem',
  ],
};
