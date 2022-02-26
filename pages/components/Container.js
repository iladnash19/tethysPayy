import Card from './Card'
import Middle from './Middle'
import RightBar from './RightBar'
import React, { useState, useEffect } from 'react'
import { useMoralis } from "react-moralis";

const Container = () => {
let [walletBalance, setBalance] = useState(0);
let [marketingBalance, setMarketing] = useState(0);
let [buyBackBalance, setBuyBack] = useState(0);
let [walletBnb, setWalletBnb] = useState(0);
let [walletAddress,setWalletAddress] = useState(0);

const { authenticate, isAuthenticated, user ,logout } = useMoralis();
const Web3 = require("web3");
const avaxProvider ="https://api.avax.network/ext/bc/C/rpc"
const bnbProvider="https://bsc-dataseed.binance.org/"
const Web3AVAXClient = new Web3(new Web3.providers.HttpProvider(avaxProvider));
const Web3BNBClient = new Web3(new Web3.providers.HttpProvider(bnbProvider));
const minABI= [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"excludeAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"includeAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcluded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"}],"name":"reflect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"},{"internalType":"bool","name":"deductTransferFee","type":"bool"}],"name":"reflectionFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rAmount","type":"uint256"}],"name":"tokenFromReflection","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const tokenAddress = "0x43ce64a4fba3c30c0164e935b0095862a67dc0c9";
const rewardToken = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const buyBackAddress="0xFd45537E9354716d4d6a431dfBfc49B4772c26e7";
const marketingAddress="0xF6265Bf11084515B4AF469A255fF20aBA197C46a";

const tokenContract = new Web3BNBClient.eth.Contract(minABI, tokenAddress);


function updateWallets(){
    
    var buybbalance = Web3BNBClient.eth.getBalance(buyBackAddress, function   (error, wei) {
        if (!error) {
            setBuyBack(Web3BNBClient.utils.fromWei(wei, 'ether'))
            
        }
      });
      
  
var markbalance = Web3BNBClient.eth.getBalance(marketingAddress, function   (error, wei) {
    if (!error) {
        setMarketing(Web3BNBClient.utils.fromWei(wei, 'ether'))
        
    }

  });



  setTimeout(updateWallets, 20000);}
  updateWallets();

  

/*********************/
useEffect(() => {
    async function fetchMyAPI() {
        if (isAuthenticated) {
            setWalletAddress(user.attributes.ethAddress);
            var waletBnbBalance = Web3BNBClient.eth.getBalance(user.attributes.ethAddress, function   (error, wei) {
                if (!error) {
                    setWalletBnb(Web3BNBClient.utils.fromWei(wei, 'ether'))
                    
                }
                
            
              });

            let walletB = await tokenContract.methods.balanceOf(user.attributes.ethAddress).call();
            let walletBalance = Web3BNBClient.utils.fromWei(walletB,'ether');
            setBalance(walletBalance*10**9);    
           
            



        
          }
   

/*
        let marketingB = await bnbContract.methods.balanceOf(marketingAddress).call();
        let marketingBalance = Web3Client.utils.fromWei(marketingB);
        marketingBalance)
        
     

        let buyBackB = await bnbContract.methods.balanceOf(buyBackAddress).call();
        let buyBackBalance = Web3Client.utils.fromWei(buyBackB);
        setBuyBack(buyBackBalance)
*/
        

    }

    fetchMyAPI()
  }, [isAuthenticated])


    return (
        <div className=" bg-gray h-full " > 
          
            
            <div className="flex   p-4 space-x-3">
                <Card title="BALANCE" balance={walletBalance+" NEKOS"} icon={0} />
                <Card title="BUSD BALANCE" balance={marketingBalance+" BUSD"} link='' icon={1} />
                <Card title="BNB BALANCE" balance={walletBnb+" BNB"}  icon={3} />
                <Card title="TOTAL SUPPLY" balance={"1,000,000,000,000,000"} link='' icon={2} />
                

            </div>
            <div className="flex  ml-3 mt-6 space-x-2  mr-4 ">
                <Middle />
            </div>
        </div>
    )
}


export default Container

