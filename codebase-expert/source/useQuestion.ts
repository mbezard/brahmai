import {useMutation} from '@tanstack/react-query';
import {askQuestion} from './openai/askQuestion.js';
import {useEffect} from 'react';
import OpenAI from 'openai';
import {Question as QuestionType} from './questions.js';

export const useQuestion = (openai: OpenAI, question: QuestionType) => {
	const {isPending: isLoading, mutateAsync} = useMutation({
		mutationKey: ['macro-architecture'],
		mutationFn: () => askQuestion(openai, question.questionWithFunction),
		onSuccess: data => {
			if (!data) throw new Error('No data');
			console.log(data);
		},
	});

	useEffect(() => {
		void mutateAsync();
	}, [mutateAsync]);

	return {isLoading};
};
