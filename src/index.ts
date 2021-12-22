import 'reflect-metadata';
import { Block } from './Block';
import { BlockChain } from './BlockChain';

const Zchain = new BlockChain();

Zchain.addBlock(new Block(new Date().getTime(), []));

console.log(JSON.stringify(Zchain.chain, null, 2));
