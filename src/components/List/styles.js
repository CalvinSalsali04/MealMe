import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '25px',
    backgroundColor: '#f5f5f5', 
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh',
    overflow: 'auto',
    padding: theme.spacing(2),
    backgroundColor: 'white', 
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
  },
  selectInput: {
    color: '#333', 
    borderColor: '#ccc', 
    '&:before': {
      borderColor: '#ccc',
    },
    '&:after': {
      borderColor: theme.palette.primary.main, 
    },
  },
  title: {
    color: theme.palette.primary.dark, 
    marginBottom: theme.spacing(2),
    fontWeight: 500, 
  },
}));
