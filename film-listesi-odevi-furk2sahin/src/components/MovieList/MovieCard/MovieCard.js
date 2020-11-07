import React, { useState } from 'react';
import MovieCategoryRow from './MovieCategoryRow';
import './css/MovieCard.css';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieRow from './MovieRow';

function MovieCard({ movie }) {
    let [showMovie, setShowMovie] = useState(false);
    const onClickHandler = () => {
        setShowMovie(showMovie = !showMovie);
    }

    return (
        <Card className="movie-card" style={{ backgroundColor: "black" }}>
            <Card.Body>
                {showMovie ?
                    <>
                        <FontAwesomeIcon className="icon-style" icon="eye" onClick={onClickHandler} />
                        <Card.Img variant="top" src={movie.image} height="300px" />
                    </> :
                    <>
                        <FontAwesomeIcon className="icon-style" icon="eye-slash" onClick={onClickHandler} />
                        <Card.Title className="movie-row">
                            <MovieRow title={movie.title} />
                        </Card.Title>
                        <Card.Text className="category-row">
                            <MovieCategoryRow category={movie.description} />
                        </Card.Text>
                    </>
                }
            </Card.Body>
        </Card >
    )
}

export default MovieCard
