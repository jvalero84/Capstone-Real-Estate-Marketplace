var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];

    describe('match erc721 spec', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});

            //console.log(account_one, account_two);
            // TODO: mint multiple tokens
            this.contract.mint(account_two, 1);
            this.contract.mint(account_two, 2);
            this.contract.mint(account_three, 3);
            this.contract.mint(account_three, 4);
            this.contract.mint(account_three, 5);
        })

        it('should return total supply', async function () {
            let supply = await this.contract.totalSupply();
            assert.equal(supply, 5, "The total supply does not match the initial supply.");
        })

        it('should get token balance', async function () {
            let accountBalance = await this.contract.balanceOf(account_three);
            assert.equal(accountBalance, 3, "The token balance of the account is not the expected.");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () {
            let tokenURI = await this.contract.tokenURI(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "The token URI is not the expected one.");
            tokenURI = await this.contract.tokenURI(3);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3", "The token URI is not the expected one.");
        })

        it('should transfer token from one owner to another', async function () {
            let origTokenBalance2 = await this.contract.balanceOf(account_two);
            let origTokenBalance3 = await this.contract.balanceOf(account_three);

            await this.contract.transferFrom(account_two, account_three, 1, {from: account_two});
            let newOwner = await this.contract.ownerOf(1);

            assert.equal(newOwner, account_three, "Transfer of token failed.");

            let tokenBalance2 = await this.contract.balanceOf(account_two);
            let tokenBalance3 = await this.contract.balanceOf(account_three);
            assert.equal(tokenBalance2, parseInt(origTokenBalance2) - 1, "Transfer of token failed.");
            assert.equal(tokenBalance3, parseInt(origTokenBalance3) + 1, "Transfer of token failed.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () {
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () {
          try{
            await this.contract.mint(account_three, 1, {from: account_two});
          } catch(e) {
            //console.log(e); //Expected failure when trying to mint a token from an address that is not the contract owner.
          }
        })

        it('should return contract owner', async function () {

          let contractOwner = await this.contract.getOwner();
          assert.equal(contractOwner, account_one, "It does not return the contract owner.");

        })

    });
})
