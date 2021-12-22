interface IBlockChain {
	chain: IBlock[];
	difficulty: number;
	getLastBlock(): IBlock;
	addBlock(block: IBlock): void;
	isValid(): boolean;
}

type Transaction = {
	from: string;
	to: string;
	amount: number;
};

interface IBlock {
	timeStamp: number;
	transactions: Transaction[];
	hash: string;
	prevHash: string;
	getHash: () => string;
	mine(difficulty: number): void;
	nonce: number;
}
