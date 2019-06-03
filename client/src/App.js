import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Particles from 'react-particles-js';

import Player from './Player';

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
    position: 'relative',
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
  // typography: {
  //   fontFamily: [
  //     '"Helvetica Neue"',
  //     '"Segoe UI"',
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     'Roboto',
  //     'Arial',
  //     'sans-serif',
  //     '"Apple Color Emoji"',
  //     '"Segoe UI Emoji"',
  //     '"Segoe UI Symbol"',
  //   ].join(','),
  // },
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
      <Router basename='/tokusetsu/party2019'>
        <Switch>
          <Route path='/Newcomer' render={(props) => {
            return (
              <Player type='A' />
            );
          }}/>
          <Route path='/NewComer' render={(props) => {
            return (
              <Player type='B' />
            );
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
