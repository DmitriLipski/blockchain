import * as CryptService from './crypto';

export class Block implements IBlock {
	index: number;
	timeStamp: number;
	transactions: Transaction[];
	hash: string;
	prevHash: string;
	nonce: number;

	constructor(
		index: number,
		timeStamp: number,
		transactions: Transaction[],
		prevHash: string,
	) {
		this.index = index;
		this.timeStamp = timeStamp;
		this.transactions = transactions;
		this.hash = this.getHash();
		this.prevHash = prevHash;
		this.nonce = 0;
	}

	getHash() {
		return CryptService.SHA256(
			`${this.prevHash} ${this.timeStamp} ${JSON.stringify(
				this.transactions,
			)} ${this.nonce}`,
		);
	}
}
