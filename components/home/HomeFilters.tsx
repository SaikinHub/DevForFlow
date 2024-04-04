'use client';

import { HomePageFilters } from '@/constants/filters';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [active, setActive] = useState('');
  const router = useRouter();

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) setActive(filter);
  }, []);

  const handleTypeclick = (item: string) => {
    if (active === item) {
      setActive('');
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['filter', 'page'],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        values: [
          { key: 'filter', value: item.toLowerCase() },
          { key: 'page', value: '1' },
        ],
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleTypeclick(item.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? 'background-light800_dark400 text-primary-500'
              : 'background-light800_dark300 text-light-500'
          }
            `}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
