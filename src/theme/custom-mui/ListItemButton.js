// ----------------------------------------------------------------------

export default function ListItemButton(theme) {
    return {
        MuiListItemButton: {
            styleOverrides: {
              root: {
                backgroundColor: theme.palette.grey[200],
                '&:hover': {
                  backgroundColor: theme.palette.grey[400]               
                },
                borderRadius: '8px'
              },
            },
        },
    };
  }
  