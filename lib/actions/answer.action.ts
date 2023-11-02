/*
    Think of what params you need to include to create an answer.
    Take heavy inspiration of all actions created so far.
    Add the created answer to a question.
    Don't forget to revalidate the path.

        content: string;
        author: string; // User ID
        question: string; // Question ID
        path: string;
*/
import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams } from './shared.types';
import { revalidatePath } from 'next/cache';

export const createAnswer = (params: CreateAnswerParams) => {
  const { content, author, question, path } = params;
  try {
    connectToDatabase();
    Answer.create({
      content,
      author,
      question,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
