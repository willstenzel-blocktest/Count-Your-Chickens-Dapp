pragma solidity 0.4.25;
contract SimpleStorage {
    uint numChicken;

    function set(uint x) public {
        numChicken = x;
    }

    function get() public constant returns (uint) {
        return numChicken;
    }
}
