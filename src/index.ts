import 'reflect-metadata';
import { BlockChain } from './BlockChain';

const main = async () => {
	const Zchain = new BlockChain();

	Zchain.addNewTransaction({ from: 'Bob', to: 'Alice', amount: 1 });
	await Zchain.mine();
	console.log('Chain: ', JSON.stringify(Zchain.chain, null, 2));
};

main()
	.then(r => r)
	.catch((e: unknown) => e);
