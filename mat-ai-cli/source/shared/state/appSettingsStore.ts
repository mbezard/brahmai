import {create} from 'zustand';
import {PersistStorage, persist} from 'zustand/middleware';
import fs from 'fs';
import {settingsFilePath} from './store.constant.js';

type Settings = {
	notion: {
		mainPageId: string;
		dailyBoardDatabaseId: string;
		epicBoardDatabaseId: string;
		projectSpecificationsPageId: string;
	};
};

type SettingsStore = {
	settings: Settings;
	setSettings: (settings: Settings) => void;
};

const initialSettings: Settings = {
	notion: {
		mainPageId: '',
		dailyBoardDatabaseId: '',
		epicBoardDatabaseId: '',
		projectSpecificationsPageId: '',
	},
};

const storage: PersistStorage<Pick<SettingsStore, 'settings'>> = {
	getItem: async () => {
		if (!fs.existsSync(settingsFilePath)) {
			return initialSettings;
		}
		const data = fs.readFileSync(settingsFilePath, 'utf8');
		return JSON.parse(data);
	},
	setItem: async (_, value) => {
		const data = JSON.stringify(value);
		fs.writeFileSync(settingsFilePath, data, 'utf8');
	},
	removeItem: async () => {
		fs.unlinkSync(settingsFilePath);
	},
};

export const useSettingsStore = create<SettingsStore>()(
	persist(
		set => ({
			settings: initialSettings,
			setSettings: settings => {
				set(prevState => ({
					settings: {...prevState.settings, ...settings},
				}));
			},
		}),
		{
			name: 'settings-store',
			storage,
			partialize: state => ({settings: state.settings}),
		},
	),
);
