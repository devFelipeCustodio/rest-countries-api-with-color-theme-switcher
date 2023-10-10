import { useRef } from 'react';
// @ts-ignore
import { DismissButton, Overlay, usePopover } from 'react-aria';
// @ts-ignore
import type { AriaPopoverProps } from 'react-aria';
import type { OverlayTriggerState } from 'react-stately';

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
    children: React.ReactNode;
    state: OverlayTriggerState;
}

function Popover({ children, state, ...props }: PopoverProps) {
    let popoverRef = useRef(null);
    let { popoverProps, underlayProps } = usePopover(
        {
            ...props,
            popoverRef,
        },
        state
    );

    return (
        <Overlay>
            <div
                {...underlayProps}
                style={{ position: 'fixed', inset: 0 }}
            />
            <div
                {...popoverProps}
                ref={popoverRef}
            >
                <DismissButton onDismiss={state.close} />
                {children}
                <DismissButton onDismiss={state.close} />
            </div>
        </Overlay>
    );
}

export default Popover;
