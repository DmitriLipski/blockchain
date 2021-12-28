import { readFile } from 'fs/promises';
import { resolve } from 'path';
import chalk from 'chalk';

import { Just, Nothing, Maybe } from './common/maybe';

export async function start(): Promise<Maybe<IBlock[]>> {
	const filePath = resolve(__dirname, './data/chain.json');
	console.log(chalk.yellow.bold('Reading blockchain file...', filePath));

	try {
		const promise = readFile(filePath, {
			encoding: 'utf8',
		});

		const stringData = await promise;
		const data = JSON.parse(stringData) as IBlock[];

		return Just(data);
	} catch (err: unknown) {
		console.error(err);
		return Nothing();
	}
}
