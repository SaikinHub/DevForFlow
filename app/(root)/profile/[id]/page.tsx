import AnswersTab from '@/components/shared/AnswersTab';
import ProfileLink from '@/components/shared/ProfileLink';
import QuestionTab from '@/components/shared/QuestionTab';
import Stats from '@/components/shared/Stats';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserInfo } from '@/lib/actions/user.action';
import { getJoinedDate } from '@/lib/utils';

import { SignedIn, auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Page = async ({ params }: any) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });
  const { name, username, picture, portfolioWebsite, location, joinedAt, bio } =
    userInfo.user;
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={picture}
            width={140}
            height={140}
            alt="profile picture"
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start">
              {portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={portfolioWebsite}
                  title={portfolioWebsite}
                />
              )}
              {location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(joinedAt)}
              />
            </div>

            <p className="paragraph-regular text-dark400_light800 mt-8">
              {bio ?? 'No bio yet.'}
            </p>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats 
        totalQuestions={userInfo.totalQuestions!}
        totalAnswers={userInfo.totalAnswers!}
      />
      <div className="mt-10 flex gap-10">
          <Tabs defaultValue="top-posts" className="flex-1">
            <TabsList className="background-light800_dark400 min-h-[42px] p-1">
              <TabsTrigger className="tab" value="top-posts">
                Top Posts
              </TabsTrigger>
              <TabsTrigger className="tab" value="answers">
                Answers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top-posts" className='flex w-full flex-col gap-6'>
              <QuestionTab
                searchParams={{fsd: ""}}
                userId={userInfo.user.id}
                clerkId={clerkId}
              />
            </TabsContent>
            <TabsContent value="answers" className='flex w-full flex-col gap-6'>
              <AnswersTab 
                searchParams={{fsd: ""}}
                userId={userInfo.user.id}
                clerkId={clerkId}
              />
            </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
