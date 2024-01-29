import NoResult from '@/components/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { IQuestion } from '@/database/question.model';
import { getQuestionsByTagId } from '@/lib/actions/tag.actions';
import { URLProps } from '@/types';

import React from 'react';

const Page = async ({ params, searchParams }: URLProps) => {
  const results = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  const { tagTitle, questions } = results;

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgScr="/assets/icons/search.svg"
          placeholder="Search questions by tag..."
          otherClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: IQuestion) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Page;
