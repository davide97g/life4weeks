const csv = require('csv-parser');
const stripBom = require('strip-bom-stream');
const fs = require('fs');

const results = [];
const lifeExpInterface =
	'export interface lifeExp {' +
	'country: string;' +
	'male: number | null;' +
	'female: number | null;' +
	'overall: number | null;' +
	'}';
fs.createReadStream('data.csv')
	.pipe(stripBom())
	.pipe(csv({ separator: ';' }, ['position', 'country', 'male', 'female', 'overall']))
	.on('data', data => {
		let entry = null;
		try {
			entry = {
				country: data['country'],
				male: parseFloat(data['male']),
				female: parseFloat(data['female']),
				overall: parseFloat(data['overall']),
			};
		} catch (err) {
			console.info(err);
		}
		if (entry) results.push(entry);
	})
	.on('end', () => {
		fs.writeFileSync(
			'index.ts',
			lifeExpInterface +
				'export const lifeExpectancies: lifeExp[] = ' +
				JSON.stringify(results),
			{
				encoding: 'utf8',
			}
		);
	});
