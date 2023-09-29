import Link from 'next/link'
import {Button} from '@/components/ui/button'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import Filter from '@/components/shared/search/Filter'
import { filters } from '@/constants/constants'


export default function Home() {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>

        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchbar 
          route="/"
          iconPosition="left"
          imgScr="/assets/icons/search.svg"
          placeholder="Searchfor questions"
          otherClasses="flex-1"
        />

        <div className='flex gap-3'>
          {filters.map((filter) => (
            <Filter
              key={filter._id}
              name={filter.name}
              highlight={filter?.highlight}
            />
          ))}
        </div>
      </div>
    </>
  )
}