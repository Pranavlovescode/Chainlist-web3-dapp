var ChainList = artifacts.require("ChainList");
const BN = web3.utils.BN;

contract('ChainList',function(account){

    var chainListInstance;
    var seller = account[1];
    var articleName = "article 1";
    var articleDescription = "Description for article 1";
    var articlePrice = 1.1;    


    it('should be initialized with empty values',function(){
        return ChainList.deployed().then(function(instance){
            return instance.getArticle()
        }).then((data)=>{
            assert.equal(data[0],0x0,"seller must be empty")
            assert.equal(data[1],'',"article name must be empty")
            assert.equal(data[2],'',"description must be empty")
            assert(data[3].eq(new BN(0)), "article price must be zero");
        })
    })
    it('should sell an article',function(){
        return ChainList.deployed().then((instance)=>{
            chainListInstance = instance
            return chainListInstance.sellArticle(
                articleName,
                articleDescription,
                web3.utils.toWei(articlePrice.toString(),'ether'),
                {from:seller}
            )
        }).then(()=>{
            return chainListInstance.getArticle()
        }).then((data)=>{
            assert.equal(data[0],seller,"seller must be "+seller)
            assert.equal(data[1],articleName,"article name must be empty "+articleName)
            assert.equal(data[2],articleDescription,"description must be empty "+articleDescription)
            assert(data[3].eq(web3.utils.toBN(web3.utils.toWei(articlePrice.toString(),'ether'))),"article price must be zero "+web3.utils.toWei(articlePrice.toString(),'ether'))
        })
    })
})