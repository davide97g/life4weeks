import { Color, colors } from '../color';

/**
 * @interface Theme
 * @description Interface for the site theme
 * @param name string
 * @param primary Color default color
 * @param accent Color accent color for extra attention
 * @author Davide Ghiotto
 */
export interface Theme {
	name: string;
	primary: Color;
	accent: Color;
}

/**
 * @name themes
 * @constant
 * @description list of available themes
 * @author Davide Ghiotto
 */
export const themes: Theme[] = [
	{
		name: 'yellow-blue',
		primary: colors.yellow,
		accent: colors.blue,
	},
	{
		name: 'green-red',
		primary: colors.green,
		accent: colors.red,
	},
];
