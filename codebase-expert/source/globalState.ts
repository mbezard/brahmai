import {create} from 'zustand';

interface GlobalState {
	macroArchitecture: string;
	setMacroArchitecture: (macroArchitecture: string) => void;
}

export const useGlobalState = create<GlobalState>()(set => ({
	macroArchitecture: '',
	setMacroArchitecture: macroArchitecture => set({macroArchitecture}),
}));
