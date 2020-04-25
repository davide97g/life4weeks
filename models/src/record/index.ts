import { Emotion } from '../emotion';

/**
 * @interface Record
 * @description Interface for the fundamental unit of information
 * @param {date} string day of the record
 * @param {emotion} Emotion how you felt that day
 * @param {notes} string extra info about the day
 * @author Davide Ghiotto
 */
export interface Record {
	date: string;
	emotion: Emotion;
	notes: string;
}

/**
 * @name records
 * @constant
 * @description test list of records (for develop mode only)
 * @author Davide Ghiotto
 */
export const records: Record[] = [
	{
		date: 'Wed, 15 Apr 2020 22:00:00 GMT',
		emotion: {
			text: 'angry',
			emoji: '😠',
			color: 'rgba(219, 100, 45, 1)',
			fullColor: { R: 219, G: 100, B: 45, a: 1 },
		},
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet molestie dui, id varius mi. Vivamus dapibus sollicitudin est, ut egestas mi posuere sed. Donec lacinia lorem non leo laoreet convallis. Sed fringilla rhoncus augue et vulputate. Phasellus sed ipsum urna. Nullam arcu augue, fringilla vitae orci ac, finibus consectetur elit.',
	},
	{
		date: 'Thu, 16 Apr 2020 22:00:00 GMT',
		emotion: {
			text: 'energetic',
			emoji: '😎',
			color: 'rgba(255, 215, 64, 1)',
			fullColor: { R: 255, G: 215, B: 64, a: 1 },
		},
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet molestie dui, id varius mi. Vivamus dapibus sollicitudin est, ut egestas mi posuere sed. Donec lacinia lorem non leo laoreet convallis.',
	},
	{
		date: 'Fri, 17 Apr 2020 22:00:00 GMT',
		emotion: {
			text: 'happy',
			emoji: '😄',
			color: 'rgba(149, 252, 149, 1)',
			fullColor: { R: 149, G: 252, B: 149, a: 1 },
		},
		notes: 'Lorem ipsum dolor sit amet',
	},
	{
		date: 'Sat, 18 Apr 2020 22:00:00 GMT',
		emotion: {
			text: 'neutral',
			emoji: '😐',
			color: 'rgba(238, 238, 238, 1)',
			fullColor: { R: 238, G: 238, B: 238, a: 1 },
		},
		notes: 'Another day passed by',
	},
	{
		date: 'Sun, 19 Apr 2020 22:00:00 GMT',
		emotion: {
			text: 'relaxed',
			emoji: '😌',
			color: 'rgba(218, 110, 200, 1)',
			fullColor: { R: 218, G: 110, B: 200, a: 1 },
		},
		notes: 'Swimming pool so good boyz',
	},
];
