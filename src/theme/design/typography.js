import palette from './palette';

// ----------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

// ----------------------------------------------------------------------

const typography = {
  fontFamily: 'Inter, sans-serif',
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 52, md: 24, lg: 24 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 40, md: 16, lg: 16 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 26, md: 16, lg: 16 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 })
  },
  h5: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 500,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  button: {
    fontWeight: 600,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
  subtitle2: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(12),
  },
  subtitle3:{
    fontWeight: 500,
    color: palette.grey[600],
    fontSize: pxToRem(14)
  },
  bold:{
    fontWeight: 600,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
  },
  submenu:{
    fontWeight: 600,
    color: palette.grey[600],
    fontSize: pxToRem(13),
  },
  widgetsubtitle:{
    fontWeight: 500,
    lineHeight: 14 / 14,
    fontSize: pxToRem(12),
  }
};

export default typography;
