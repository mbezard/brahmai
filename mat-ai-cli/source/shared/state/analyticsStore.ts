import {create} from 'zustand';
import {PersistStorage, persist} from 'zustand/middleware';
import fs from 'fs';
import {analyticsFilePath} from './store.constant.js';

type Analytic = {
	type: string;
	createdAt: Date;
	data: any;
};

type AnalyticsStore = {
	analytics: Analytic[];
	addAnalytic: (analytic: Omit<Analytic, 'createdAt'>) => void;
};

const storage: PersistStorage<Pick<AnalyticsStore, 'analytics'>> = {
	getItem: async () => {
		if (!fs.existsSync(analyticsFilePath)) {
			return [];
		}
		const data = fs.readFileSync(analyticsFilePath, 'utf8');
		return JSON.parse(data);
	},
	setItem: async (_, value) => {
		const data = JSON.stringify(value);
		fs.writeFileSync(analyticsFilePath, data, 'utf8');
	},
	removeItem: async () => {
		fs.unlinkSync(analyticsFilePath);
	},
};

export const useAnalyticsStore = create<AnalyticsStore>()(
	persist(
		set => ({
			analytics: [],
			addAnalytic: analytic => {
				const createdAt = new Date();
				const analyticWithCreatedAt = {...analytic, createdAt};
				set(state => ({
					analytics: [...state.analytics, analyticWithCreatedAt],
				}));
			},
		}),
		{
			name: 'analytics-store',
			storage,
			partialize: state => ({analytics: state.analytics}),
		},
	),
);

export const useAddAnalytic = () =>
	useAnalyticsStore(state => state.addAnalytic);
