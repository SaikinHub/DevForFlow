import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MetricProps {
  imgUrl: string;
  title?: string;
  alt: string;
  value: string | number;
  textStyles: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  title,
  alt,
  value,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={20}
        height={20}
        className={`object-${
          href ? 'cover rounded-full w-[20px] h-[20px]' : 'contain'
        }`}
      />
      <p
        className={`${textStyles} small-medium flex items-center gap-1 mt-[0.1rem]`}
      >
        {value}{' '}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? 'max-sm:hidden' : ''
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1.5">
        {metricContent}
      </Link>
    );
  }
  return (
    <div className="flex-center flex-wrap gap-[0.2rem]">{metricContent}</div>
  );
};

export default Metric;
