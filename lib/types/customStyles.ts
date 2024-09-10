export const customStyles = {
  'rows': {
    'style': {
      'minHeight': '72px',
      'fontSize': '14px',
      'width': '100%',
      'color': 'black',
      '&:hover': { 'backgroundColor': '#A4C3B2' }
    },
  },
  'headCells': {
    'style': {
      'paddingLeft': '8px',
      'paddingRight': '8px',
      'fontSize': '18px',
      'letterSpacing': '2px',
      'width': '100%',
      'display': 'flex',
      'color': 'black',
      'justifyContent': 'center',
    },
  },
  'cells': {
    'style': {
      'fontSize': '16px',
      'letterSpacing': '2px',
      'paddingLeft': '8px', // override the cell padding for data cells
      'paddingRight': '8px',
      'display': 'flex',
      'justifyContent': 'center',
      'color': 'black',
    },
  },
};