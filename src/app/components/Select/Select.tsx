import { PropsWithChildren, useEffect, useRef } from 'react';
import useFilterContext from '../../hooks/useFilterContext';
import { SelectStateOptions, useSelectState } from 'react-stately';
import {
    HiddenSelect,
    useSelect,
    // @ts-ignore
} from 'react-aria';
import Button from './Button';
import Popover from './Popover';
import ListBox from './ListBox';
import ChevronDown from '../icons/ChevronDown';
import { CountryLimitActionKind } from '../../context/FilterContext';

const Select = (
    props: PropsWithChildren &
        SelectStateOptions<HTMLUListElement> & { name?: string }
) => {
    const { region, setRegion } = useFilterContext();
    const listBoxRef = useRef<HTMLUListElement>(null);
    let state = useSelectState<HTMLUListElement>(props);
    let ref = useRef<HTMLButtonElement>(null);
    let { labelProps, triggerProps, valueProps, menuProps } = useSelect(
        props,
        state,
        ref
    );

    useEffect(() => {
        if (state && state.selectedItem) {
            if (state.selectedItem.index !== 0) {
                setRegion(state.selectedItem.textValue);
            } else {
                setRegion(null);
                state.setSelectedKey(null);
            }
        }
    }, [state]);

    return (
        <div>
            <div {...labelProps}>{props.label}</div>
            <HiddenSelect
                isDisabled={props.isDisabled}
                state={state}
                triggerRef={ref}
                label={props.label}
                name={props.name}
            />
            <Button
                {...triggerProps}
                buttonRef={ref}
            >
                <span {...valueProps}>
                    {region ||
                        (state.selectedItem
                            ? state.selectedItem.rendered
                            : 'Filter by Region')}
                </span>
                <ChevronDown
                    aria-hidden
                    width={12}
                    height={12}
                />
            </Button>
            {state.isOpen && (
                <Popover
                    state={state}
                    triggerRef={ref}
                    placement="bottom start"
                >
                    <ListBox
                        {...menuProps}
                        listBoxRef={listBoxRef}
                        state={state}
                    />
                </Popover>
            )}
        </div>
    );
};

export default Select;
