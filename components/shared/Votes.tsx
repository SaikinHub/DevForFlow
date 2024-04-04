'use client';
import { DownvoteAnswer, UpvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumberWithSuffix } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from '../ui/use-toast';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleSave = async () => {
    const params = {
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    };
    await toggleSaveQuestion(params);

    return toast({
      title: `Question ${
        !hasSaved ? 'Saved in' : 'Removed from'
      } your collection`,
      variant: !hasSaved ? 'default' : 'destructive',
    });
  };
  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: 'Please log in',
        description: 'You must be logged in to perform this action',
      });
    }
    const params = {
      itemId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      hasDownvoted,
      hasUpvoted,
      path: pathname,
    };

    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion(params);
      } else if (type === 'answer') {
        await UpvoteAnswer(params);
      }
    } else if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion(params);
      } else if (type === 'answer') {
        await DownvoteAnswer(params);
      }
    }

    return toast({
      title: `Upvote ${!hasUpvoted ? 'Sucessful' : 'Removed'}`,
      variant: !hasUpvoted ? 'default' : 'destructive',
    });
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            onClick={() => handleVote('upvote')}
            className="cursor-pointer"
            alt="upvote"
          />
          <div className="background-light700_dark400 flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {formatNumberWithSuffix(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            onClick={() => handleVote('downvote')}
            className="cursor-pointer"
            alt="downvote"
          />
          <div className="background-light700_dark400 flex-center min-w-[18px] rounded-sm p-1 ">
            <p className="subtle-medium text-dark400_light900">
              {downvotes > 0 ? '-' : ''} {formatNumberWithSuffix(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === 'question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          onClick={() => handleSave()}
          className="cursor-pointer"
          alt="star"
        />
      )}
    </div>
  );
};

export default Votes;
