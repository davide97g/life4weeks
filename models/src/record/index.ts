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
		emotion: { text: 'angry', emoji: '😠', color: '#db642d' },
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet molestie dui, id varius mi. Vivamus dapibus sollicitudin est, ut egestas mi posuere sed. Donec lacinia lorem non leo laoreet convallis. Sed fringilla rhoncus augue et vulputate. Phasellus sed ipsum urna. Nullam arcu augue, fringilla vitae orci ac, finibus consectetur elit.',
	},
	{
		date: 'Thu, 16 Apr 2020 22:00:00 GMT',
		emotion: { text: 'energetic', emoji: '😎', color: '#ffd740' },
		notes:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet molestie dui, id varius mi. Vivamus dapibus sollicitudin est, ut egestas mi posuere sed. Donec lacinia lorem non leo laoreet convallis.',
	},
	{
		date: 'Fri, 17 Apr 2020 22:00:00 GMT',
		emotion: { text: 'happy', emoji: '😄', color: '#95fc95' },
		notes: 'Lorem ipsum dolor sit amet',
	},
	{
		date: 'Sat, 18 Apr 2020 22:00:00 GMT',
		emotion: { text: 'neutral', emoji: '😐', color: '#eeeeee' },
		notes: 'Another day passed by',
	},
	{
		date: 'Sun, 19 Apr 2020 22:00:00 GMT',
		emotion: { text: 'relaxed', emoji: '😌', color: '#da6ec8' },
		notes: 'Swimming pool so good boyz',
	},
];
