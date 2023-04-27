pragma solidity ^0.8.0;

contract Casino489 {

    mapping(address => uint) public balances;
    uint public contractBalance;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        contractBalance += msg.value;
    }

    function withdraw(uint amount, uint multiplier) public {
        balances[msg.sender] -= amount;
        contractBalance -= amount;
        uint reward = amount * multiplier;
        require(reward <= contractBalance, "Insufficient contract balance");
        balances[msg.sender] += reward;
        contractBalance -= reward;
        payable(msg.sender).transfer(reward);

    }

    function getBalances() public view returns (address[] memory, uint[] memory) {
        uint length = 1;
        address[] memory addresses = new address[](length);
        uint[] memory balancesArray = new uint[](length);
        addresses[0] = msg.sender;
        balancesArray[0] = balances[msg.sender];
        return (addresses, balancesArray);
    }

}




