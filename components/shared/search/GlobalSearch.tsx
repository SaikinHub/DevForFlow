'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import GlobalResult from './GlobalResult';

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get('global');
  const [search, setSearch] = useState(query || '');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          });
          router.push(newUrl, { scroll: false });
          setIsOpen(false);
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          onFocus={() => search && setIsOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            if (search) setIsOpen(true);
            if (e.target.value === '' && isOpen) setIsOpen(false);
          }}
          value={search}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none text-dark400_light700"
        />
      </div>
      {isOpen && <GlobalResult setIsOpen={setIsOpen} setSearch={setSearch} />}
    </div>
  );
};

export default GlobalSearch;
