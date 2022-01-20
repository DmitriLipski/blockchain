import crypto, {
	createPrivateKey,
	createPublicKey,
	generateKeyPair,
} from 'crypto';
import { KeyPairKeyObject } from '../wallet/types';

export function SHA256(message: string) {
	return crypto.createHash('sha256').update(message).digest('hex');
}

function getCipherKey(password: string) {
	return crypto.createHash('sha256').update(password).digest();
}

export async function generateNewKeyPair(
	passphrase: string,
): Promise<KeyPairKeyObject> {
	return new Promise(resolve => {
		let publicKeyResult = '';
		let privateKeyResult = '';

		generateKeyPair(
			'rsa',
			{
				modulusLength: 4096,
				publicKeyEncoding: {
					type: 'spki',
					format: 'pem',
				},
				privateKeyEncoding: {
					type: 'pkcs8',
					format: 'pem',
					cipher: 'aes-256-cbc',
					passphrase,
				},
			},
			(err, publicKey, privateKey) => {
				if (err) {
					console.log('Errr is: ', err);
					resolve({
						publicKey: publicKeyResult,
						privateKey: privateKeyResult,
					});
				} else {
					publicKeyResult = publicKey;
					privateKeyResult = privateKey;
					resolve({
						publicKey: publicKeyResult,
						privateKey: privateKeyResult,
					});
				}
			},
		);
	});
}

export const encryptData = (buffer: Buffer, password: string) => {
	// Create an initialization vector
	const initVect = crypto.randomBytes(16);
	const CIPHER_KEY = getCipherKey(password);
	// Create a new cipher using the algorithm, key, and iv
	const cipher = crypto.createCipheriv('aes256', CIPHER_KEY, initVect);
	// Create the new (encrypted) buffer
	return Buffer.concat([initVect, cipher.update(buffer), cipher.final()]);
};

export const decryptData = (encrypted: Buffer, password: string) => {
	// Get the iv: the first 16 bytes
	const initVect = encrypted.slice(0, 16);
	// Get the rest
	encrypted = encrypted.slice(16);
	const CIPHER_KEY = getCipherKey(password);
	// Create a decipher
	const decipher = crypto.createDecipheriv('aes256', CIPHER_KEY, initVect);
	// Actually decrypt it
	return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

export function privateToPublicKey(
	privateKey: string | Buffer,
	passphrase: string,
): string {
	if (Buffer.isBuffer(privateKey)) {
		return Buffer.from(
			createPublicKey({
				key: Buffer.from(
					createPrivateKey({
						key: privateKey,
						format: 'der',
						passphrase: passphrase,
					}).export({
						type: 'pkcs8',
						format: 'der',
					}),
				),
				format: 'der',
			}).export({
				format: 'der',
				type: 'spki',
			}),
		).toString();
	}
	return createPublicKey({
		key: createPrivateKey({
			key: privateKey,
			format: 'pem',
			passphrase: passphrase,
		})
			.export({
				type: 'pkcs8',
				format: 'pem',
			})
			.toString(),
		format: 'pem',
	})
		.export({
			format: 'pem',
			type: 'spki',
		})
		.toString();
}
