import { Block } from './Block';

export class BlockChain implements IBlockChain {
	chain: IBlock[] = [];
	unconfirmedTransactions: Transaction[] = [];
	difficulty: number;

	constructor() {
		this.difficulty = 5;
		this.createGenesisBlock();
	}

	createGenesisBlock() {
		const genesisBlock = new Block(0, new Date().getTime(), [], '');
		this.chain.push(genesisBlock);
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1];
	}

	async proofOfWork(block: IBlock) {
		let computedHash = block.getHash();
		return new Promise((resolve: (v: Hash) => void) => {
			while (!computedHash.startsWith(Array(this.difficulty + 1).join('0'))) {
				block.nonce++;
				computedHash = block.getHash();
			}
			resolve(computedHash);
		});
	}

	addBlock(block: IBlock, proof: Hash) {
		const prevHash = this.getLastBlock().hash;
		if (prevHash !== block.prevHash) {
			return false;
		}

		if (!this.isValidProof(block, proof)) {
			return false;
		}

		block.hash = proof;
		this.chain.push(block);
		return true;
	}

	isValidProof(block: IBlock, blockHash: Hash) {
		return (
			blockHash.startsWith(Array(this.difficulty + 1).join('0')) &&
			blockHash === block.getHash()
		);
	}

	addNewTransaction(transaction: Transaction) {
		this.unconfirmedTransactions.push(transaction);
	}

	async mine() {
		console.log('Start mining...');
		if (this.unconfirmedTransactions.length === 0) {
			return false;
		}

		const lastBlock = this.getLastBlock();

		const newBlock = new Block(
			lastBlock.index + 1,
			new Date().getTime(),
			this.unconfirmedTransactions,
			lastBlock.hash,
		);

		const proof = await this.proofOfWork(newBlock);
		this.addBlock(newBlock, proof);
		this.unconfirmedTransactions = [];
		console.log('isValid', this.isValid());

		return newBlock.index;
	}

	isValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const prevBlock = this.chain[i - 1];

			if (
				currentBlock.hash !== currentBlock.getHash() ||
				prevBlock.hash !== currentBlock.prevHash
			) {
				return false;
			}
		}

		return true;
	}
}
