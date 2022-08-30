pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {

  Verifier verifier;

  // TODO define a solutions struct that can hold an index & an address
  struct Solutions {
    uint[2] a;
    uint[2][2] b;
    uint[2] c;
    uint[2] input;
  }

  // TODO define an array of the above struct


  // TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => Solutions) private submittedSolutions;

  // TODO Create an event to emit when a solution is added
  event solutionAdded(address submitter);

  // TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint[2] memory a,
                       uint[2][2] memory b,
                       uint[2] memory c,
                       uint[2] memory input)
                       public
  {

    bytes32 solHash = keccak256(abi.encodePacked(a, b, c, input));

    Solutions memory solution = Solutions({
                                              a: a,
                                              b: b,
                                              c: c,
                                              input: input
                                            });

    submittedSolutions[solHash] = solution;
    emit solutionAdded(msg.sender);

  }


}
















// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly




contract Verifier {
  function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool);
}
