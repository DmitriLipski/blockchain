import chalk from 'chalk';

import { Wallet } from './Wallet';

async function main() {
	try {
		const wallet = new Wallet();
		await wallet.createWalletFile();
		const address = await wallet.getPublicAddress();

		console.log('address', chalk.yellow.bold(address));
	} catch (err: unknown) {
		console.error(err);
	}
}

main()
	.then(r => r)
	.catch((e: unknown) => e);
