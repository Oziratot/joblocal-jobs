import React from "react";
import PropTypes from "prop-types";

function Checkbox({ label, value, onChange }) {
    return (
        <div className="ui-checkbox">
            <label>
                <input type="checkbox" value={value} onChange={onChange} />
                {label}
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
}

export default Checkbox;
