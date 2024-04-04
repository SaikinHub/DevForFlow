import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result?.answers.length > 0 ? (
        result.answers.map((item) => (
          <AnswerCard
            key={item._id}
            _id={item._id}
            clerkId={clerkId}
            question={item.question}
            author={item.author}
            upvotes={item.upvotes}
            createdAt={item.createdAt}
          />
        ))
      ) : (
        <p className="text-dark400_light800">No questions answered yet...</p>
      )}
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result ? result.isNextAnswers : false}
        />
      </div>
    </>
  );
};

export default AnswersTab;
