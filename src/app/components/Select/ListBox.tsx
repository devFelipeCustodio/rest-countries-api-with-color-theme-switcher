import { AriaListBoxOptions, useListBox, useOption } from '@react-aria/listbox';
import { useRef } from 'react';
import { ListState, Node } from 'react-stately';
import styles from './ListBox.module.scss';

function ListBox(
    props: AriaListBoxOptions<HTMLUListElement> & {
        listBoxRef: React.RefObject<HTMLUListElement>;
        state: ListState<HTMLUListElement>;
    }
) {
    let ref = useRef(null);
    let { listBoxRef = ref, state } = props;
    let { listBoxProps } = useListBox(props, state, listBoxRef);

    return (
        <ul
            className={styles.list_box}
            {...listBoxProps}
            ref={listBoxRef}
        >
            {[...state.collection].map((item) => (
                <Option
                    key={item.key}
                    item={item}
                    state={state}
                />
            ))}
        </ul>
    );
}

function Option({
    item,
    state,
}: {
    item: Node<HTMLUListElement>;
    state: ListState<HTMLUListElement>;
}) {
    let ref = useRef(null);
    let { optionProps } = useOption(
        { key: item.key },
        state,
        ref
    );

    return (
        <li
            {...optionProps}
            ref={ref}
        >
            {item.rendered}
        </li>
    );
}

export default ListBox;
