import React from "react";
import PropTypes from "prop-types";

function Checkbox({ checked, onChange, children }) {
    return (
        <div>
            <label className="ui-checkbox-container">
                <input className="ui-checkbox" checked={checked} onChange={onChange} type="checkbox" />
                {children && (
                    <span className="label">
                        {children}
                    </span>
                )}
            </label>
        </div>
    )
}

Checkbox.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    checked: PropTypes.bool,
    children: PropTypes.node,
}

export default Checkbox;
