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

/* 
 ? Here I chose to NOT use an array of colors (Color[]) 
 ? because I wanted to specificy the exact name of the colors 
 ? and define exactly the type of the "colors" object
*/
/**
 * @name colors
 * @constant
 * @description map of all available colors
 * @author Davide Ghiotto
 */
export const colors: {
	yellow: Color;
	blue: Color;
	green: Color;
	red: Color;
	gray: Color;
	purple: Color;
	brown: Color;
} = {
	yellow: {
		rgba: { R: 255, G: 215, B: 64, a: 1, value: 'rgba(255, 215, 64, 1)' },
	},
	blue: {
		rgba: { R: 62, G: 195, B: 236, a: 1, value: 'rgba(62, 195, 236, 1)' },
	},
	green: {
		rgba: { R: 149, G: 252, B: 149, a: 1, value: 'rgba(149, 252, 149, 1)' },
	},
	red: {
		rgba: { R: 219, G: 100, B: 45, a: 1, value: 'rgba(219, 100, 45, 1)' },
	},
	gray: {
		rgba: { R: 238, G: 238, B: 238, a: 1, value: 'rgba(238, 238, 238, 1)' },
	},
	purple: {
		rgba: { R: 218, G: 110, B: 200, a: 1, value: 'rgba(218, 110, 200, 1)' },
	},
	brown: { rgba: { R: 180, G: 132, B: 61, a: 1, value: 'rgba(180, 132, 61, 1)' } },
};
