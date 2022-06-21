import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Spinner from './Spinner';

export default class Button extends React.PureComponent {
    static Color = {
        orange: 'orange',
        white: 'white',
        transparent: 'transparent',
    };

    static Size = {
        sm: 'sm',
        lg: 'lg',
    };

    static Appearance = {
        link: 'link',
        button: 'button',
    };

    static propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.string,
        appearance: PropTypes.string,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func,
        type: PropTypes.string,
        tabIndex: PropTypes.string,
        form: PropTypes.string,
    };

    static defaultProps = {
        className: '',
        disabled: false,
        loading: false,
        color: 'orange',
        size: 'sm',
        appearance: 'button', // (link|button)
        type: 'button', // (submit|button)
        tabIndex: '',
        form: undefined,
        onClick: () => {},
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (!this.props.disabled && !this.props.loading) {
            this.props.onClick(e);
        }
    }

    render() {
        const {
            color, size, appearance, form, type,
            tabIndex, disabled, loading, children,
        } = this.props;
        const className = classnames('ui-button', this.props.className, `ui-button-appearance-${appearance}`, {
            loading,
            disabled,
            [`ui-button-${color}`]: appearance === Button.Appearance.button,
            [`ui-button-${size}`]: appearance === Button.Appearance.button,
        });

        return (
            <button
                form={form}
                type={type}
                disabled={disabled || loading}
                className={className}
                onClick={this.onClick}
                tabIndex={tabIndex}
            >
                <span className="ui-button-content">
                    <CSSTransition
                      classNames="ui-button-spinner"
                      timeout={300}
                      in={loading}
                      mountOnEnter
                      unmountOnExit
                    >
                        <Spinner />
                    </CSSTransition>
                    <span className="ui-button-text">{children}</span>
                </span>
             </button>
        );
    }
}
