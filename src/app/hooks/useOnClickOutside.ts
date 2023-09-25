'use client';

import { RefObject, useEffect } from 'react';

function assertIsNode(e: EventTarget | null): asserts e is Node {
    if (!e || !('nodeType' in e)) {
        throw new Error(`Node expected`);
    }
}

function useOnClickOutside(ref: RefObject<HTMLElement>, handleClick: Function) {
    const listenner = (e: Event) => {
        assertIsNode(e.target);
        if (ref.current && !ref.current.contains(e.target)) {
            handleClick(e);
        }
    };
    useEffect(() => {
        window.addEventListener('click', listenner);

        return () => window.removeEventListener('click', listenner);
    }, []);
    return [ref, handleClick];
}

export default useOnClickOutside;
