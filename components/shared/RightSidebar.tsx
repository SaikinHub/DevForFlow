import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { topQuestions, popularTags } from '@/constants/constants'
import RenderTag from './RenderTag'

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar background-light900_dark200 light-border fixed right-0 top-0 flex h-screen flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
        <div className='mt-7 grid w-full gap-[30px]'>
          {topQuestions.map((question) => (
            <Link 
            key={question._id} 
            href={`/questions/${question._id}`}
            className='flex cursor-pointer justify-between gap-7'
            >
              <p className='text-dark500_light700 body-medium'>{question.title}</p>
              <Image
              src="/assets/icons/chevron-right.svg"
              alt='chevron right'
              width={20}
              height={20}
              className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900 mb-7'>Popular Tags</h3>
        <div className='mt-7 grid gap-4'>
          {popularTags.map((tag) => (
              <RenderTag 
                key={tag._id}  
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RightSidebar