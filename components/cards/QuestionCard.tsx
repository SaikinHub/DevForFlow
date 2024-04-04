import Link from 'next/link';
import React from 'react';
import RenderTag from '../shared/RenderTag';
import Metric from '../shared/Metric';
import { formatNumberWithSuffix, getTimeStamp } from '@/lib/utils';
import { SignedIn, auth } from '@clerk/nextjs';
import EditDeleteAction from '../shared/EditDeleteAction';

interface QuestionsProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    username: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionsProps) => {
  const { userId } = auth();
  const showActionButtons = author.clerkId && author.clerkId === userId;

  return (
    <div className="card-wrapper flex flex-col items-start justify-between gap-5 rounded-[10px] p-9 sm:px-11">
      <div className="flex justify-between w-full">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author?.name ? author.name : `@${author?.username}`}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatNumberWithSuffix(upvotes.length)}
            title={upvotes.length > 1 ? ' Votes' : 'Vote'}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumberWithSuffix(answers.length)}
            title={answers.length > 1 ? ' Answers' : 'Answer'}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatNumberWithSuffix(views)}
            title={views > 1 ? ' Views' : 'View'}
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
