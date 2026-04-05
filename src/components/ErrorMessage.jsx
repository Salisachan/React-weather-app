import React from 'react'

// displays error messages to the user
function ErrorMessage({ message }) {
    return (
        <div className="error-message" role="alert">
            <span>⚠️ {message}</span>
        </div>
    )
}

export default ErrorMessage