import React from 'react';
import Link from 'next/link';

interface TagProps {
  tag: {
    _id: string;
    name: string;
    description: string;
    questions: Array<object>;
  };
}

const TagCard = ({ tag }: TagProps) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      key={tag._id}
      className="shadow-light100_darknone"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="background-light800_dark400  line-clamp-1 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>
        <p className="text-dark400_light500 small-medium mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {tag.questions.length}+
          </span>{' '}
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
