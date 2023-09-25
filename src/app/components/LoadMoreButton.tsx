'use client';

import useActionsContext from '../hooks/useActionsContext';

const LoadMoreButton = () => {
    const MAX_COUNTRIES_TO_LOAD = 15;
    const { setMaxCountries } = useActionsContext();
    const loadMore = () =>
        setMaxCountries((prev) =>
            prev ? prev + prev : MAX_COUNTRIES_TO_LOAD
        );
    return <button onClick={loadMore}>Load more</button>;
};

export default LoadMoreButton;
