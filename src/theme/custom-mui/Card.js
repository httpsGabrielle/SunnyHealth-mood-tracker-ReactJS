// ----------------------------------------------------------------------

export default function Card(theme) {
    console.log(theme.shadows)
    return {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: theme.shadows[1],
            borderRadius: 12 * 2,
            position: 'relative',
            zIndex: 0,
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: 'h6' }
        },
        styleOverrides: {
          root: {
            padding: 12,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 12,
          },
        },
      },
    };
  }
  