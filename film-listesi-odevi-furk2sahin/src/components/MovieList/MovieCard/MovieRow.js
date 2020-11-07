import React from 'react';
import './css/MovieRow.css';

function MovieRow({ title }) {

    return (
        <>
            {title}
            <hr color="white" />
        </>
    )
}

export default MovieRow
