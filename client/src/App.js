import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Particles from 'react-particles-js';

const useStyles = makeStyles(theme => ({
  app: {
    background: theme.background,
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
  }
}));

const theme = {
  background: 'linear-gradient(135deg, #f989cb 0%, #7ee5e3 100%)',
};

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Main />
    </ThemeProvider>
  );
}

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Particles />
    </div>
  );

}

export default App;
