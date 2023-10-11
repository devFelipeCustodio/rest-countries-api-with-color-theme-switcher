import { AriaButtonProps, useButton } from '@react-aria/button';
import React, { PropsWithChildren, useRef } from 'react';
import styles from './Button.module.scss';

function Button(
    props: PropsWithChildren &
        AriaButtonProps &
        React.HTMLProps<HTMLButtonElement> & {
            buttonRef?: React.RefObject<HTMLButtonElement>;
        }
) {
    let ref = props.buttonRef || useRef(null);
    let { buttonProps } = useButton(props, ref);
    return (
        <button
            className={styles.btn}
            {...buttonProps}
            ref={ref}
        >
            {props.children}
        </button>
    );
}

export default Button;
