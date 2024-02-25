import {useMutation} from '@tanstack/react-query';
import {askQuestion} from './openai/askQuestion.js';
import {macroArchitectureQuestion} from './openai/prompts.js';
import {useGlobalState} from './globalState.js';
import {useEffect} from 'react';
import OpenAI from 'openai';

export const useCodebaseExpert = (openai: OpenAI) => {
	const {setMacroArchitecture} = useGlobalState();
	const {isPending: isMacroArchitectureLoading, mutateAsync} = useMutation({
		mutationKey: ['macro-architecture'],
		mutationFn: () => askQuestion(openai, macroArchitectureQuestion),
		onSuccess: data => {
			if (!data) throw new Error('No data');
			setMacroArchitecture(data);
		},
	});

	useEffect(() => {
		void mutateAsync();
	}, [mutateAsync]);

	return {isMacroArchitectureLoading};
};
