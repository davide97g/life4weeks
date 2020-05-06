import { Color, colors } from '../color';

/**
 * @interface Emotion
 * @description Interface for the emotion object
 * @param {text} string the name of the emotion
 * @param {emoji} string emoji rappresentation of the "text" emotion
 * @param {color} Color color associated with the emotion
 * @author Davide Ghiotto
 */
export interface Emotion {
	text: string;
	emoji: string;
	color: Color;
}

/**
 * @name EmotionList
 * @constant
 * @description original list of emotions
 * @author Davide Ghiotto
 */
export const EmotionList: Emotion[] = [
	{
		text: 'angry',
		emoji: '😠',
		color: colors.red,
	},
	{
		text: 'energetic',
		emoji: '😎',
		color: colors.yellow,
	},
	{
		text: 'happy',
		emoji: '😄',
		color: colors.green,
	},
	{
		text: 'neutral',
		emoji: '😐',
		color: colors.gray,
	},
	{
		text: 'relaxed',
		emoji: '😌',
		color: colors.purple,
	},
	{
		text: 'sad',
		emoji: '😥',
		color: colors.blue,
	},
	{
		text: 'sick',
		emoji: '🤒',
		color: colors.brown,
	},
];
