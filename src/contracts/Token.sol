// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Token {
    string public name = "Brij Token";
    string public symbol = "BRJ";
    uint256 public decimal = 10;
    uint256 public totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed delegate,
        uint256 amount
    );

    //track balance
    //send token
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        totalSupply = 1000000 * (10**decimal);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(_to != address(0));
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        require(balanceOf[_from] >= _value, "_trasfer insufficient balance");
        balanceOf[_from] = balanceOf[_from] - _value;
        balanceOf[_to] = balanceOf[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
    }

    //Approve token
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        return true;
    }


    function transferFrom(address _from , address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value ; 
        _transfer(_from, _to, _value);
        return true;
    }

    
}
