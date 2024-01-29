import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const elapsedTime = Math.abs(now.getTime() - createdAt.getTime());
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  if (elapsedTime < msPerMinute) {
    const secondsAgo = Math.round(elapsedTime / 1000);
    return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
  } else if (elapsedTime < msPerHour) {
    const minutesAgo = Math.round(elapsedTime / msPerMinute);
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  } else if (elapsedTime < msPerDay) {
    const hoursAgo = Math.round(elapsedTime / msPerHour);
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else if (elapsedTime < msPerMonth) {
    const daysAgo = Math.round(elapsedTime / msPerDay);
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else if (elapsedTime < msPerYear) {
    const monthsAgo = Math.round(elapsedTime / msPerMonth);
    return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
  } else {
    const yearsAgo = Math.round(elapsedTime / msPerYear);
    return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
  }
};

export const formatNumberWithSuffix = (number: number) => {
  let formattedNumber = '';

  if (Math.abs(number) >= 1000000) {
    formattedNumber = (number / 1000000).toFixed(1);
  } else if (Math.abs(number) >= 1000) {
    formattedNumber = (number / 1000).toFixed(1);
  } else {
    formattedNumber = number.toFixed(0);
  }

  formattedNumber = formattedNumber.replace(/\.0+$/, '');

  if (Math.abs(number) >= 1000000) {
    return formattedNumber + 'M';
  } else if (Math.abs(number) >= 1000) {
    return formattedNumber + 'K';
  } else {
    return formattedNumber;
  }
};

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const joinedDate = `${month} ${year}`;
  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null
}

export const formUrlQuery = ({params, key, value}: UrlQueryParams) => {
  const currentUrl = qs.parse(params)
  currentUrl[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  {skipNull: true}
  )
}


interface removeUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({params, keysToRemove}: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params)
  
  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })  

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  {skipNull: true}
  )
}