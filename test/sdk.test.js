const sdk = require('../src/index');
const Web3 = require('web3');
const { isValidAddress } = require('../src/utils');

// 設置 Web3 實例
const web3 = new Web3(window.ethereum);

// 測試RPC接口
async function testGetBalance() {
    const balance = await sdk.getBalance('0x1234567890abcdef1234567890abcdef12345678'); // 改成你自己的地址。
    console.log(`Balance: ${balance} ${sdk.tokenName}`);
}

// 測試交易生成與發送
async function testSendTransaction() {
    const from = '0x1234567890abcdef1234567890abcdef12345678'; // 改成你自己的地址。
    const to = '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef'; // 改成你想接收的地址。
    const value = 0.1; // 發送 0.1 BRNKC

    const transaction = sdk.createTransaction(from, to, value);
    
    // 這裡應該調用錢包來簽署交易
    if (typeof window.ethereum !== 'undefined') {
        try {
            // 提示用戶連接錢包
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            const accounts = await web3.eth.getAccounts();
            const fromAddress = accounts[0]; // 獲取當前帳戶地址
            
            // 使用 Web3.js 從錢包發送交易
            const receipt = await web3.eth.sendTransaction({
                from: fromAddress,
                to: to,
                value: web3.utils.toWei(value.toString(), 'ether'),
                gas: 21000, // 預設 gas
                data: transaction.data, // 這裡是 SDK 創建的交易數據
            });

            console.log('Transaction receipt:', receipt);
        } catch (error) {
            console.error('Error during transaction signing or sending:', error);
        }
    } else {
        console.log('No wallet detected. Please install MetaMask or another Web3 wallet.');
    }
}

// 測試區塊信息查詢
async function testGetBlock() {
    const block = await sdk.getBlock(1); // 查詢第1區塊
    console.log('Block details:', block);
}

// 驗證地址
async function testAddressValidation() {
    const valid = isValidAddress('0x1234567890abcdef1234567890abcdef12345678'); // 改成你自己的地址。
    console.log(`Is valid address: ${valid}`);
}

// 執行測試
async function runTests() {
    await testGetBalance();
    await testSendTransaction();
    await testGetBlock();
    await testAddressValidation();
}

runTests();
