var correctProof = require('../../zokrates/code/square/proof.json');

var SolSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier');

contract('TestSolnSquareVerifier', accounts => {

  const account_one = accounts[0];
  const account_two = accounts[1];

  describe('Test SolnSquareVerifier', function () {
      beforeEach(async function () {
          this.verifier = await Verifier.new();
          this.contract = await SolSquareVerifier.new(this.verifier.address, {from: account_one});
      })


      // Test if a new solution can be added for contract - SolnSquareVerifier
      it('A new solution can be added for contract', async function () {


        await this.contract.addSolution(
                                        correctProof.proof.a,
                                        correctProof.proof.b,
                                        correctProof.proof.c,
                                        correctProof.inputs);

        let eventResult = await this.contract.getPastEvents('solutionAdded');
        console.log(`event solutionAdded length: ${eventResult.length}`);
        assert.equal(eventResult.length, 1, "The provided solution could not be added");

        let solExist = await this.contract.solutionExist.call(
                                                        correctProof.proof.a,
                                                        correctProof.proof.b,
                                                        correctProof.proof.c,
                                                        correctProof.inputs);

        console.log(`solution provided exists? ${solExist}`);

        //Lets try to add the same solution again..
        await this.contract.addSolution(
                                        correctProof.proof.a,
                                        correctProof.proof.b,
                                        correctProof.proof.c,
                                        correctProof.inputs);

        eventResult = await this.contract.getPastEvents('solutionAlreadyExist');
        console.log(`event solutionAlreadyExist length: ${eventResult.length}`);
        assert.equal(eventResult.length, 1, "The provided solution could be added when it should not!");

      })

      // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
      it('An ERC721 token can be minted for contract - SolnSquareVerifier', async function () {
        try {
          await this.contract.mint(
                                          correctProof.proof.a,
                                          correctProof.proof.b,
                                          correctProof.proof.c,
                                          correctProof.inputs,
                                          1,
                                          account_two);
        } catch (e) {
          console.log(e);
        }


      })

  });


})
