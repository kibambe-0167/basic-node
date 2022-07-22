//SPDX-License-Identifier: MIT

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


contract MedicineContract {
  string public name;
  string public description;
  string public madeBy;
  string public batchNumber;

  // medicine's name
  function setName(string memory newName) public{
    name = newName;
  }
  function getName() public view returns(string memory){
    return name;
  }

  
  struct Medicine {
    string name;
    string description;
    string madeBy;
    string batchNumber;
  }

  // medicine's description
  event getmedicine(string name, string  description, string madeBy, string batchNumber);
  
  // view returns (Medicine memory)
  function getMedicine() public {
    Medicine memory medicine;
    medicine.name = name;
    medicine.description = description;
    medicine.madeBy = madeBy;
    medicine.batchNumber = batchNumber;
    // return medicine;

    emit getmedicine(name, description, madeBy, batchNumber);
  }

  

  function setMedicine(string memory newName, string memory newDescription, string memory newMadeBy, string memory newBatchNumber ) public{
    name = newName;
    description = newDescription;
    madeBy = newMadeBy;
    batchNumber = newBatchNumber;
  }

  // // medicine's description
  // function setDesc(string memory details) public{
  //   description = details ;
  // }
  // function getDesc() public view returns(string memory){
  //   return description;
  // }


  // // medicine's made by
  // function setOwner(string memory owner) public{
  //   madeBy = owner;
  // }
  // function getOwner() public view returns(string memory){
  //   return madeBy;
  // }
}