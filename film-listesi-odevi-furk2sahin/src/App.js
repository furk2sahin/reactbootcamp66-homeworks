import React from 'react';
import './App.css';
import Greeting from './components/Greetings';
import MovieList from './components/MovieList/MovieList';
import "./components/FontawesomeIcons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="p-3 bg-dark">
      <Greeting name="Furkan Sahin" />
      <MovieList />
    </Container>
  );
}

export default App;
