const Web3 = require('web3');
const { isValidAddress, isContractAddress } = require('./utils');  // 引入工具函數

// 使用 Web3 初始化
const web3 = new Web3(window.ethereum);

// 創建交易
async function createTransaction(from, to, value, data = '', gasLimit = 21000, gasPrice = '10') {
    const fromValidation = isValidAddress(from);
    const toValidation = isValidAddress(to);

    if (!fromValidation.isValid || !toValidation.isValid) {
        console.log('Invalid address');
        return;
    }

    // 檢查是否是合約地址
    const fromIsContract = await isContractAddress(web3, from);
    const toIsContract = await isContractAddress(web3, to);

    if (fromIsContract.isContract || toIsContract.isContract) {
        console.log('Address is a contract');
    } else {
        console.log('Proceed with transaction...');
    }

    // 發送交易邏輯
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const fromAddress = accounts[0];  // 使用當前選中的帳戶

        const tx = {
            from: fromAddress,
            to,
            value: web3.utils.toWei(value.toString(), 'ether'),
            data,
            gasLimit,
            gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei'),
        };

        const txHash = await web3.eth.sendTransaction(tx);
        console.log('Transaction sent:', txHash);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

// 查詢帳戶餘額
async function getBalance(address) {
    try {
        const balance = await web3.eth.getBalance(address);
        console.log('Balance:', web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}
