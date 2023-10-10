import { AriaButtonProps, useButton } from '@react-aria/button';
import React, { PropsWithChildren } from 'react';
import styles from '../components/Button.module.scss'

function Button(
    props: PropsWithChildren &
        AriaButtonProps &
        React.HTMLProps<HTMLButtonElement> & {
            buttonRef: React.RefObject<HTMLButtonElement>;
        }
) {
    let ref = props.buttonRef;
    let { buttonProps } = useButton(props, ref);
    return (
        <button className={styles.btn}
            {...buttonProps}
            ref={ref}
        >
            {props.children}
        </button>
    );
}

export default Button;
