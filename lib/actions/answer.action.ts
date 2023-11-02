'use server';
import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';
import User from '@/database/user.model';

export const createAnswer = async (params: CreateAnswerParams) => {
  const { content, author, question, path } = params;
  try {
    connectToDatabase();
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  const { questionId } = params;
  try {
    connectToDatabase();
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name username picture',
      })
      .sort({ createdAt: -1 });
    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
