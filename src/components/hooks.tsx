'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQuery = matchMedia(query);
    const handleChange = (e: unknown) =>
      setMatches((e as typeof matchQuery).matches);

    setMatches(matchQuery.matches);

    matchQuery.addEventListener('change', handleChange);
    return () => matchQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};
