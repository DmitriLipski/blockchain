import 'reflect-metadata';
import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import chalk from 'chalk';

import { BlockChain } from './BlockChain';
import { start } from './app';
import { MaybeType } from './common/maybe';

const main = async () => {
	try {
		const chain = await start();

		if (chain.type === MaybeType.Nothing) {
			return;
		}

		const Zchain = new BlockChain(chain.value);

		Zchain.addNewTransaction({ from: 'Sam', to: 'Bob', amount: 2 });
		await Zchain.mine();

		console.log(chalk.yellow.bold(`Chain length - ${Zchain.getChainLength()}`));

		const data = new Uint8Array(
			Buffer.from(JSON.stringify(Zchain.chain, null, 2)),
		);
		const promise = writeFile(resolve(__dirname, './data/chain.json'), data);

		await promise;
	} catch (err) {
		console.error(err);
	}
};

main()
	.then(r => r)
	.catch((e: unknown) => e);
