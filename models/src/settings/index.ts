import { Emotion, EmotionList } from '../emotion';
import { Theme, themes } from '../theme';

/**
 * @interface Settings
 * @description Interface for modeling the user's settings
 * @param dateFormat string format of the date
 * @param theme Theme theme of the wesite
 * @param customEmotions Emotion[] array of emotion-colors
 * @author Davide Ghiotto
 */
export interface Settings {
	dateFormat: string; // customize how date is presented dd/mm/yyyy - mm/dd/yyyy - ...
	customEmotions: Emotion[]; // list of custom emotion colors --> equal to the original but with different colors
	theme: Theme; // site theme --> change the entire site theme
	avatar: string; // fullPath of the avatar
	/**	other settings here	*/
}

/**
 * @name defaultSettings
 * @constant
 * @description default settings
 * @author Davide Ghiotto
 */
export const defaultSettings: Settings = {
	dateFormat: 'dd/MM/yyyy',
	theme: themes[0],
	customEmotions: EmotionList,
	avatar: 'avatars/boy-1.png',
};
