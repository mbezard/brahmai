import {create} from 'zustand';
import {QuestionKey} from './questions.js';

interface GlobalState {
	allQuestions: Record<QuestionKey, string>;
	saveAnyData: (key: QuestionKey, data: string) => void;
}

export const useGlobalState = create<GlobalState>()(set => ({
	allQuestions: {
		macroArchitecture: '',
		mainTechnoAndLanguagesQuestion: '',
		fiveTestExamplesQuestions: '',
		mainConfigFilesQuestion: '',
	},
	saveAnyData: (key, data) =>
		set(state => ({
			allQuestions: {
				...state.allQuestions,
				[key]: data,
			},
		})),
}));
