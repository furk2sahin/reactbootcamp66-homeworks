import React from 'react'
import { ErrorDiv } from './Error.styles'

const Error = ({ showError, message }) => {
    return (
        <>
            {showError ? <ErrorDiv>{message}</ErrorDiv> : null}
        </>
    )
}

export default Error