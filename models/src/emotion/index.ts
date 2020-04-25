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
	color: string;
	fullColor: Color;
}

export interface Color {
	R: number;
	G: number;
	B: number;
	a: number;
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
		color: 'rgba(219, 100, 45, 1)',
		fullColor: { R: 219, G: 100, B: 45, a: 1 },
	},
	{
		text: 'energetic',
		emoji: '😎',
		color: 'rgba(255, 215, 64, 1)',
		fullColor: { R: 255, G: 215, B: 64, a: 1 },
	},
	{
		text: 'happy',
		emoji: '😄',
		color: 'rgba(149, 252, 149, 1)',
		fullColor: { R: 149, G: 252, B: 149, a: 1 },
	},
	{
		text: 'neutral',
		emoji: '😐',
		color: 'rgba(238, 238, 238, 1)',
		fullColor: { R: 238, G: 238, B: 238, a: 1 },
	},
	{
		text: 'relaxed',
		emoji: '😌',
		color: 'rgba(218, 110, 200, 1)',
		fullColor: { R: 218, G: 110, B: 200, a: 1 },
	},
	{
		text: 'sad',
		emoji: '😥',
		color: 'rgba(62, 195, 236, 1)',
		fullColor: { R: 62, G: 195, B: 236, a: 1 },
	},
	{
		text: 'sick',
		emoji: '🤒',
		color: 'rgba(180, 132, 61, 1)',
		fullColor: { R: 180, G: 132, B: 61, a: 1 },
	},
];
