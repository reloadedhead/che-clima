import { makeStyles, Theme, createStyles, CssBaseline } from '@material-ui/core';
import React from 'react';
import Header from './header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const AppShell = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>Hello World!</div>
      </main>
    </>
  )
};

export default AppShell;
