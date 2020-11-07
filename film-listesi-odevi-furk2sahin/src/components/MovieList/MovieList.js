import React from 'react';
import { Col, Row } from 'react-bootstrap';
import movies from '../../movies';
import MovieCard from './MovieCard/MovieCard';
import './MovieList.css';

const MovieList = () => {
    return (
        <Row className="p-5">
            {
                movies.map((movie) => (
                    <Col className="p-4" md={4} key={movie.id}>
                        <MovieCard movie={movie} />
                    </Col>
                ))
            }
        </Row >
    )
}

export default MovieList
