import React from 'react';
import { ReactComponent as SpinnerIcon } from '../../assets/svg/spinner.svg'

export default function Spinner() {
    return (
        <span className="ui-button-spinner">
            <SpinnerIcon className="ui-button-spinner-svg" />
        </span>
    );
}
