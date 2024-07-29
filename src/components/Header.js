import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Task Markup System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Task List
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;