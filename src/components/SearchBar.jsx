import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
    // track what the user is typing in the search box
    const [input, setInput] = useState('')

    // runs when the form is submitted
    const handleSubmit = (e) => {
        // prevents page from refreshing on form submit
        e.preventDefault()
        // only search if input is not empty
        if (input.trim()) {
            onSearch(input.trim())
        }
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            {/* controlled input - value tied to state */}
            <input
                className="search-bar__input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search city..."
                disabled={loading}
            />
            {/* disabled while loading or input is empty */}
            <button
                className="search-bar__btn"
                type="submit"
                disabled={loading || !input.trim()}
            >
                🔍
            </button>
        </form>
    )
}

export default SearchBar