import {useMutation} from '@tanstack/react-query';
import {askQuestion} from './openai/askQuestion.js';
import {useEffect, useRef} from 'react';
import OpenAI from 'openai';
import {Question as QuestionType} from './questions.js';
import {useGlobalState} from './globalState.js';

export const useQuestion = (openai: OpenAI, question: QuestionType) => {
	const hasBeenAskedRef = useRef(false);
	const saveAnyData = useGlobalState(state => state.saveAnyData);
	const {isPending: isLoading, mutateAsync} = useMutation({
		mutationKey: ['macro-architecture'],
		mutationFn: () => askQuestion(openai, question.questionWithFunction),
		onSuccess: data => {
			if (!data) throw new Error('No data');
			saveAnyData(question.key, data);
		},
	});

	useEffect(() => {
		if (!hasBeenAskedRef.current) {
			hasBeenAskedRef.current = true;
			mutateAsync();
		}
	}, [mutateAsync]);

	return {isLoading};
};
