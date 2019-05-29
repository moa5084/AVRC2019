import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Particles from 'react-particles-js';

import AnswerSheet from './AnswerSheet';
import { createMuiTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    background: theme.background,
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '90%',
    height: '90%',
    margin: '0',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  particles: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: '0',
    left: '0',
    xIndex: '-1',
  }
}));

const theme = createMuiTheme({
  background: 'linear-gradient(135deg, #f989cb 0%, #7ee5e3 100%)',
  palette: {
    primary: {
      light: '#ff669a',
      main: '#ff4081',
      dark: '#b22c5a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#66cfff',
      main: '#40c4ff',
      dark: '#2c89b2',
      contrastText: '#000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} >
      <Wrapper />
    </ThemeProvider>
  );
}

function Wrapper() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Particles className={classes.particles} />
      <Main />
    </div>
  );
}

function Main() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <AnswerSheet />
    </div>
  );
}

export default App;
