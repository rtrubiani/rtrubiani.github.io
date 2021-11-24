// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

/**
 * @title Project
 * @dev Store & retrieve value in a variable
 */
 // Create 2 variables: insurance request name, amount required
contract Project {

    uint256 number;
    string name;

    /**
     * @dev Store value in variable
     * @param num value to store
     */

      // Store 2 variables: insurance request name, amount required

    function store(uint256 num) public {
        number = num;
        
    }
    
    function storeT(string memory titolo) public {
        name = titolo;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */

// Retrieve 2 variables: insurance request name, amount required
    function retrieve() public view returns (uint256){
        return number;
    }
    function retrieveT() public view returns (string memory){
        return name;
    }
}