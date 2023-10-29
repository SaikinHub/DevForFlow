import Image from 'next/image';
import React from 'react';
import RenderTag from '../shared/RenderTag';
import Link from 'next/link';
import { getTopInteractedTags } from '@/lib/actions/tag.actions';
import { Badge } from '../ui/badge';

interface UsersProps {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
  tags: {
    _id: string;
    name: string;
  }[];
}

const UserCard = async ({
  user: { _id, clerkId, picture, name, username },
  tags,
}: UsersProps) => {
  const interactedTags = await getTopInteractedTags({ userId: _id });
  return (
    <Link
      href={`profile/${clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center rounded-2xl border p-8">
        <Image
          src={picture}
          width={100}
          height={100}
          alt="user profile picture"
          className=" rounded-full"
        />
        <div className="mt-4 text-center">
          <p className="h3-bold text-dark200_light900 line-clamp-1">{name}</p>
          <p className="body-regular text-dark500_light500 mt-2">{`@${username}`}</p>
        </div>
        <div className="mt-5 flex gap-2">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge></Badge>
          )}
        </div>
      </article>
      {/* <div className="background-light900_dark200  flex h-[280px] w-[260px] flex-col items-center justify-center  rounded-[10px]">
        <Link
          href={`profile/${clerkId}`}
          className="flex flex-col items-center justify-center "
        ></Link>
      </div> */}
    </Link>
  );
};

export default UserCard;
