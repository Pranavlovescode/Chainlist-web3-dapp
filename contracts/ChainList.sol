// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract ChainList {

    // Type variables
    struct Article {
        uint id;
        address seller;
        address buyer;
        string name;
        string description;
        uint256 price;        
    }
    
    mapping (uint => Article) public articles;
    uint articleCounter;
    
    // Function to sell an article
    function sellArticle(string memory _name, string memory _description, uint256 _price) public {
        articleCounter++;
        // store this article
        articles[articleCounter] = Article(
            articleCounter,
            address(msg.sender),
            address(0x0),
            _name,
            _description,
            _price
        );
    }

    // Function to get the number of articles
    function getNumberOfArticles() public view returns (uint) {
        return articleCounter;
    }

    // Function to get the array of articles which are still for sale
    function getArticlesForSale() public view returns (uint[] memory){
        // prepare putput array
        uint[] memory artileId = new uint[](articleCounter);
        uint numberOfArticlesForSale = 0;
        // iterate over articles
        for (uint i = 0; i < articleCounter; i++) {
            if (articles[i].buyer == address(0x0)) {
                artileId[numberOfArticlesForSale] = articles[i].id;
                numberOfArticlesForSale++;
            }
        }

        // copy the articleId array into a smaller forSale array
        uint[] memory forSale = new uint[](numberOfArticlesForSale);
        for (uint i = 0; i < numberOfArticlesForSale; i++) {
            forSale[i] = artileId[i];
        }
        return forSale;
    }

    function getArticle() public pure returns (
        address _seller,
        address _buyer,
        string memory _name,
        string memory _description,
        uint256 _price
    ) {
        return (_seller, _buyer,_name, _description, _price);
    }

    // Function to buy an article
    function buyArticle(uint _id) payable public {
        // The counter must be greater than 0
        require(articleCounter > 0, "There must be at least one article");

        // checks if the article exists
        require(_id > 0 && _id <= articleCounter, "The article must exist");

        // retrieve the article
        Article storage article = articles[_id];

        // checks if there is an article for sale
        require(article.seller != address(0x0), "Seller is not set");

        // checks if the article has not been sold yet
        require(msg.sender != article.seller, "Seller cannot buy his own article");

        // checks if the value sent corresponds to the price of the article
        require(msg.value == article.price, "Value sent is not equal to the price of the article");

        // transfer the ownership of the article
        article.buyer = msg.sender;

        // the buyer can pay the seller
        payable(article.seller).transfer(msg.value);

    }
}
