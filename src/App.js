import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskMarkup from './components/TaskMarkup';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskMarkup />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;