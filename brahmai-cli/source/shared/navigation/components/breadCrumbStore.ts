import {create} from 'zustand';

type BreadCrumbStore = {
	paths: string[];
	addPath: (path: string) => void;
	goBack: () => void;
};

export const useBreadCrumbStore = create<BreadCrumbStore>(set => ({
	paths: [],
	addPath: path => set(state => ({paths: [...state.paths, path]})),
	goBack: () =>
		set(state => ({paths: state.paths.slice(0, state.paths.length - 1)})),
}));
