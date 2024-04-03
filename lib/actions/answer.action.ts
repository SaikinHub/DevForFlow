'use server';
import Answer from '@/database/answer.model';
import { connectToDatabase } from '../mongoose';
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';
import User from '@/database/user.model';
import Interaction from '@/database/interaction.model';

export const createAnswer = async (params: CreateAnswerParams) => {
  const { content, author, question, path } = params;
  try {
    await connectToDatabase();
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });
    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    await Interaction.create({
      user: author,
      action: 'answer',
      question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  const { questionId, sortBy, page = 1, pageSize = 2 } = params;
  try {
    await connectToDatabase();

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 };
        break;
      case 'lowestUpvotes':
        sortOptions = { upvotes: 1 };
        break;
      case 'recent':
        sortOptions = { createdAt: -1 };
        break;
      case 'old':
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: 'author',
        model: User,
        select: '_id clerkId name username picture upvotes downvotes',
      })
      .sort(sortOptions);

    const totalAnswers = await Answer.countDocuments({
      question: questionId,
    });

    const isNextAnswers = totalAnswers > skipAmount + answers.length;

    return { answers, isNextAnswers: isNextAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    await connectToDatabase();
    const { itemId, userId, hasDownvoted, hasUpvoted, path } = params;

    let updateQuery = {};
    if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
      };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { upvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpvoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DownvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    await connectToDatabase();
    const { itemId, userId, hasDownvoted, hasUpvoted, path } = params;

    let updateQuery = {};
    if (hasDownvoted) {
      updateQuery = {
        $pull: { downvotes: userId },
      };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = {
        $addToSet: { downvotes: userId },
      };
    }

    const answer = await Answer.findByIdAndUpdate(itemId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error('Answer not found');
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownvoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    await connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    await answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
