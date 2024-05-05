// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ChainList {
    // state variables
    address public seller;
    string public name;
    string public description;
    uint256 public price;

    
    // Function to sell an article
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
        seller = msg.sender;
        name = _name;
        description = _description;
        price = _price;
    }

    function getArticle() public view returns (
        address _seller,
        string memory _name,
        string memory _description,
        uint256 _price
    ) {
        return (seller, name, description, price);
    }
}
