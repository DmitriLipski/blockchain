import { writeFile, mkdir, readFile } from 'fs/promises';
import { resolve } from 'path';

import { IWallet } from './types';
import {
	decryptData,
	encryptData,
	generateNewKeyPair,
	privateToPublicKey,
	SHA256,
} from '../crypto';

const PASSPHRASE = 'top secret';

export class Wallet implements IWallet {
	balance = 0;

	async createWalletFile() {
		try {
			const { privateKey } = await generateNewKeyPair(PASSPHRASE);
			const encryptedWalletData = encryptData(
				Buffer.from(privateKey),
				'CoolPass',
			); // Password is hardcoded for the time being

			await mkdir(resolve(__dirname, '.wallet'), { recursive: true });

			await writeFile(
				resolve(__dirname, './.wallet/wallet'),
				encryptedWalletData,
			);
		} catch (err: unknown) {
			console.error(err);
		}
	}

	async getPublicAddress() {
		const encryptedWalletData = await readFile(
			resolve(__dirname, './.wallet/wallet'),
		);
		const decrypted = decryptData(encryptedWalletData, 'CoolPass');
		const decryptedPrivateKey = decrypted.toString();

		const publicKey = privateToPublicKey(decryptedPrivateKey, PASSPHRASE);
		return SHA256(publicKey);
	}
}
