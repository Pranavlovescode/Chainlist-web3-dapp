// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ChainList {
    // state variables
    address public seller;
    string public name;
    string public description;
    uint256 public price;
    address public buyer;

    
    // Function to sell an article
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
        buyer = address(0x0);
        seller = msg.sender;
        name = _name;
        description = _description;
        price = _price;
    }

    function getArticle() public view returns (
        address _seller,
        address _buyer,
        string memory _name,
        string memory _description,
        uint256 _price
    ) {
        return (seller,buyer, name, description, price);
    }

    // Function to buy an article
    function buyArticle() payable public {
        // checks if there is an article for sale
        require(seller != address(0x0), "Seller is not set");
        // checks if the article has not been sold yet
        require(msg.sender != seller, "Seller cannot buy his own article");
        // checks if the value sent corresponds to the price of the article
        require(msg.value == price, "Value sent is not equal to the price of the article");
        // transfer the ownership of the article
        buyer = msg.sender;
        // the buyer can pay the seller
        payable(seller).transfer(msg.value);

    }
}
