import { useEffect, useState } from 'react';

function useHasScrolledPast(distanceInPixel: number) {
    const [hasScrolledPast, setHasScrolledPast] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > distanceInPixel) {
            setHasScrolledPast(true);
        } else {
            setHasScrolledPast(false);
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);

        return () => document.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return hasScrolledPast;
}

export default useHasScrolledPast;
