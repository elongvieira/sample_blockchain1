
const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;
    let blockchain2;

    beforeEach(() => {
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'arquivo.pdf';
        blockchain.addBlock(data);

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        blockchain2.addBlock('500U$');

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it('invalidate a chain with a currupt genesis block', () => {
        blockchain2.chain[0].data = '0U$';//corrupt

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('invalidate a corrupt chain', () => {
        blockchain2.addBlock('500U$');
        blockchain2.chain[1].lastHash = '0U$';//corrupt

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('replace the chain with a valid chain', () => {
        blockchain2.addBlock('500U$');
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).toEqual(blockchain2.chain);
    });

    it('does not replace the chain with one of less than or equal length', () => {
        blockchain.addBlock('200U$');
        blockchain.replaceChain(blockchain2.chain);

        expect(blockchain.chain).not.toEqual(blockchain2.chain);
    });
})