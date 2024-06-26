import Answer from '@/components/forms/Answer';
import AllAnswers from '@/components/shared/AllAnswers';
import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import RenderTag from '@/components/shared/RenderTag';
import Votes from '@/components/shared/Votes';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { formatNumberWithSuffix, getTimeStamp } from '@/lib/utils';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: { id: string };
  searchParams: { page: number; filter: string };
}

const page = async ({ params, searchParams }: Props) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId } = auth();

  const {
    _id,
    title,
    author,
    createdAt,
    answers,
    views,
    content,
    tags,
    upvotes,
    downvotes,
  } = result.question;
  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId: userId });
  }
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={author.picture}
              width={35}
              height={35}
              alt="profile"
              className="object-cover rounded-full w-[35px] h-[35px]"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(_id)}
              userId={JSON.stringify(mongoUser?._id)}
              hasUpvoted={upvotes.includes(mongoUser?._id)}
              hasDownvoted={downvotes.includes(mongoUser?._id)}
              upvotes={upvotes.length}
              downvotes={downvotes.length}
              hasSaved={mongoUser?.saved?.includes(_id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900  mt-3 w-full text-left">
          {title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` Asked ${getTimeStamp(createdAt)}`}
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumberWithSuffix(answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumberWithSuffix(views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        userId={mongoUser?._id}
        questionId={_id}
        totalAnswers={answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <Answer
        authorId={JSON.stringify(mongoUser?._id)}
        question={content}
        questionId={JSON.stringify(_id)}
      />
    </>
  );
};

export default page;
