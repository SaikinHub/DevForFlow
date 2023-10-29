'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '../../ui/input';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgScr: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgScr,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 
        ${otherClasses} 
        ${iconPosition === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <Image
        src={imgScr}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular placeholder no-focus border-none bg-transparent shadow-none outline-transparent"
      />
    </div>
  );
};

export default LocalSearchbar;
