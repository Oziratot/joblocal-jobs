import React from "react";
import PropTypes from "prop-types";

function SearchInput({ className, onChange, placeholder }) {
    return (
        <input
            className={className}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
        />
    );
}

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
}

export default SearchInput;
