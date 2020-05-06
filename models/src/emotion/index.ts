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
 * @interface Color
 * @description Interface for the color data
 * @param {name} string the common name of the color, if exists
 * @param {rgba} RGBA the color in rgba format
 * @param {hex} HEX the color in hex format
 * @author Davide Ghiotto
 */
export interface Color {
	name?: string;
	rgba: RGBA;
	hex?: HEX;
	// other formats in the future if needed
}

/**
 * @interface RGBA
 * @description Interface for the RGBA color definition
 * @author Davide Ghiotto
 */
interface RGBA {
	R: number;
	G: number;
	B: number;
	a: number;
	value: string;
}

/**
 * @interface HEX
 * @description Interface for the HEX color definition
 * @author Davide Ghiotto
 */
interface HEX {
	R: string;
	G: string;
	B: string;
	value: string;
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
		color: { rgba: { R: 219, G: 100, B: 45, a: 1, value: 'rgba(219, 100, 45, 1)' } },
	},
	{
		text: 'energetic',
		emoji: '😎',
		color: { rgba: { R: 255, G: 215, B: 64, a: 1, value: 'rgba(255, 215, 64, 1)' } },
	},
	{
		text: 'happy',
		emoji: '😄',
		color: { rgba: { R: 149, G: 252, B: 149, a: 1, value: 'rgba(149, 252, 149, 1)' } },
	},
	{
		text: 'neutral',
		emoji: '😐',
		color: { rgba: { R: 238, G: 238, B: 238, a: 1, value: 'rgba(238, 238, 238, 1)' } },
	},
	{
		text: 'relaxed',
		emoji: '😌',
		color: { rgba: { R: 218, G: 110, B: 200, a: 1, value: 'rgba(218, 110, 200, 1)' } },
	},
	{
		text: 'sad',
		emoji: '😥',
		color: { rgba: { R: 62, G: 195, B: 236, a: 1, value: 'rgba(62, 195, 236, 1)' } },
	},
	{
		text: 'sick',
		emoji: '🤒',
		color: { rgba: { R: 180, G: 132, B: 61, a: 1, value: 'rgba(180, 132, 61, 1)' } },
	},
];
