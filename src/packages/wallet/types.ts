export interface IWallet {
	balance: number;
	createWalletFile: () => void;
	getPublicAddress: () => Promise<string>;
}

export interface KeyPairKeyObject {
	publicKey: string;
	privateKey: string;
}
