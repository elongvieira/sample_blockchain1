const Block = require('./block');

const block = new Block('321321', '123123', '123123', '100');

//console.log(block.toString());
//console.log(Block.genesis().toString());
const primeiroBloco = Block.mineBlock(Block.genesis(), '$500');
console.log("primeiro bloco", primeiroBloco.toString());

