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
  mapping(bytes32 => bool) private solutionExistance;

  // TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => Solutions) private submittedSolutions;

  // TODO Create an event to emit when a solution is added
  event solutionAdded(address indexed submitter);
  event solutionAlreadyExist(address indexed submitter);

  constructor(address verifierAddress) public {
    verifier = Verifier(verifierAddress);
  }

  // TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint[2] memory a,
                       uint[2][2] memory b,
                       uint[2] memory c,
                       uint[2] memory input)
                       public
  {

    bytes32 solHash = keccak256(abi.encodePacked(a, b, c, input));



    //emit solutionAdded(address(0));

    Solutions memory solution = Solutions({
                                              a: a,
                                              b: b,
                                              c: c,
                                              input: input
                                            });



    if(!solutionExistance[solHash]){

      bool validSol = verifier.verifyTx(solution.a, solution.b, solution.c, solution.input);

      if(validSol){
        submittedSolutions[solHash] = solution;
        solutionExistance[solHash] = true;
        emit solutionAdded(msg.sender);
      }

    } else {
      emit solutionAlreadyExist(msg.sender);
    }

  }

  function solutionExist(uint[2] memory a,
                         uint[2][2] memory b,
                         uint[2] memory c,
                         uint[2] memory input)
                         public
                         view
                         returns (bool)
 {
   bytes32 solHash = keccak256(abi.encodePacked(a, b, c, input));
   return solutionExistance[solHash];
 }

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly
  function mint(uint[2] memory a,
                uint[2][2] memory b,
                uint[2] memory c,
                uint[2] memory input,
                uint256 tokenId,
                address to)
                public
  {
    require(to != address(0), "Invalid to address provided");

    addSolution(a, b, c, input);

    super.mint(to, tokenId);

  }


}





















contract Verifier {
  function verifyTx(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns (bool);
}
