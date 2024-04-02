import Link from 'next/link';
import React from 'react';
import Metric from '../shared/Metric';
import { formatNumberWithSuffix, getTimeStamp } from '@/lib/utils';
import { SignedIn } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';

interface Props {
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    name: string;
    username: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  createdAt: Date;
  clerkId?: string | null;
}

const AnswerCard = ({
  _id,
  author,
  upvotes,
  question,
  createdAt,
  clerkId,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row">
        <div className="flex justify-between w-full">
          <div>
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimeStamp(createdAt)}
            </span>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {question.title}
            </h3>
          </div>

          <SignedIn>
            {showActionButtons && (
              <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
            )}
          </SignedIn>
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="user avatar"
            value={author.username}
            title={` - asked ${getTimeStamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt=" Votes"
            value={formatNumberWithSuffix(upvotes.length)}
            title={upvotes.length > 1 ? ' Votes' : 'Vote'}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
