import { Block } from './Block';

export class BlockChain implements IBlockChain {
	chain: IBlock[];
	difficulty: number;

	constructor() {
		this.chain = [new Block(new Date().getTime(), [])]; // First Genesis block
		this.difficulty = 1;
	}

	getLastBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(block: IBlock) {
		block.prevHash = this.getLastBlock().hash;
		block.hash = block.getHash();
		block.mine(this.difficulty);
		this.chain.push(block);
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
