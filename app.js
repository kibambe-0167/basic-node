const express = require('express');
const app = express();
var cors = require('cors');
const port = 4000;

// require("dotenv").config();
const bodyParser = require('body-parser');
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./artifacts/contracts/medicineContract.sol/MedicineContract.json');

const contractAdrr = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
var privateKeys = [
    "3f841bf589fdf83a521e55d51afddc34fa65351161eead24f064855fc29c9580",
    "9549f39decea7b7504e15572b2c6a72766df0281cea22bd1a3bc87166b1ca290",
];
// "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
const url_ = "http://127.0.0.1:8545/";
const provider = new Provider(privateKeys, url_);
const web3 = new Web3(provider);
const myContract = new web3.eth.Contract(MyContract.abi, address);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
app.use(express.json());


// get all medicine
const get = async() => {
    var medicines = await myContract.getAll((error, result) => {
        if(!error) {
            console.log( result );
        }
        else {
            console.log(error);
        }
    });
    console.log(medicines)
    return medicines;
};

// post medicine for the stakeholders to track
const add = async(data) => {
    var res = await myContract.methods.setMedicine(data.name, data.madeBy, data.description, data.batchNumber);
    console.log(res);
    return res;
};


// index end points
app.get('/', async(req, ress) => {
    ress.json({ message: "Initial End Points..." });
});

// entry end point.
app.get('/get', async(req, ress) => {
    var data = undefined;
    await get().then(res => {
        var d = res;
        data = d;
        // console.log("\n\nRESPONSE", res);
        // patisa
        ress.json({ message: data.getmedicine });
    });
})

// set medicine to block chain
app.post("/add", async(req, res) => {
    meds = req.body;
    data = undefined;
    console.log(meds);
    add(meds).then(res => {
        console.log("\n\nRESPONSE:", res);
        data = res;
    });
    res.json({ message: data });
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});