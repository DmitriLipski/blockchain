interface IBlockChain {
	chain: IBlock[];
	unconfirmedTransactions: Transaction[];
	difficulty: number;
	getLastBlock(): IBlock;
	proofOfWork(block: IBlock): Promise<Hash>;
	addBlock(block: IBlock, proof: Hash): boolean;
	isValidProof(block: IBlock, blockHash: Hash): boolean;
	addNewTransaction(transaction: Transaction): void;
	mine(): Promise<BlockIndex | boolean>;
	isValid(): boolean;
	getChainLength(): number;
}

type Transaction = {
	from: string;
	to: string;
	amount: number;
};

interface IBlock {
	index: number;
	timeStamp: number;
	transactions: Transaction[];
	hash: Hash;
	prevHash: Hash;
	getHash: () => string;
	nonce: number;
}

type Hash = string;
type BlockIndex = number;
