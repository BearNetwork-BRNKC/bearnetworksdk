const Web3 = require('web3');
const { checkIfOnBearNetwork, isValidAddress } = require('./utils');  // 引入工具函數

// 使用 Web3 初始化
const web3 = new Web3(window.ethereum);

// 檢查是否在熊網鏈上
async function checkNetwork() {
    const networkStatus = await checkIfOnBearNetwork(web3);
    if (!networkStatus.isBearNetwork) {
        console.log(networkStatus.error);  // 提示錯誤
    } else {
        console.log('You are on Bear Network!');
    }
}

// 驗證地址
function validateAddress(address) {
    const { isValid, error } = isValidAddress(address);
    if (!isValid) {
        console.log(error);  // 顯示錯誤
    } else {
        console.log('Address is valid');
    }
}

// 初始化SDK並檢查MetaMask鏈接
async function initializeSdk() {
    try {
        // 請求MetaMask帳戶
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];

        console.log('Connected account:', userAddress);
        checkNetwork();
    } catch (error) {
        console.error('MetaMask connection failed:', error);
    }
}

// 初始化SDK
initializeSdk();
