import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleThemeOnClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="App">
      <Container className={theme === 'light' ? "bg-light" : "bg-dark"}>
        <GameBoard theme={theme} toggleThemeOnClick={toggleThemeOnClick} theme={theme} />
      </Container>
    </div >
  );
}

export default App;
