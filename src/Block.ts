import * as CryptService from './crypto';

export class Block implements IBlock {
	timeStamp: number;
	transactions: Transaction[];
	hash: string;
	prevHash: string;
	nonce: number;

	constructor(timeStamp: number, transactions: Transaction[]) {
		this.timeStamp = timeStamp;
		this.transactions = transactions;
		this.hash = this.getHash();
		this.prevHash = '';
		this.nonce = 0;
	}

	getHash() {
		return CryptService.SHA256(
			`${this.prevHash} ${this.timeStamp} ${JSON.stringify(
				this.transactions,
			)} ${this.nonce}`,
		);
	}

	mine(difficulty: IBlockChain['difficulty']) {
		while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
			this.nonce++;
			this.hash = this.getHash();
		}
	}
}
