const Web3 = require('web3');

// 檢查地址有效性並返回錯誤信息
function isValidAddress(address) {
    if (!address) {
        return { isValid: false, error: 'Address is required' };
    }

    if (!Web3.utils.isAddress(address)) {
        return { isValid: false, error: 'Invalid Ethereum address format' };
    }

    return { isValid: true };
}

// 檢查是否是合約地址
async function isContractAddress(web3, address) {
    try {
        const code = await web3.eth.getCode(address);
        return { isContract: code !== '0x', address };
    } catch (error) {
        console.error("Error checking contract address", error);
        return { isContract: false, address, error: error.message };
    }
}

// 檢查是否在熊網鏈上
async function checkIfOnBearNetwork(web3) {
    try {
        const networkId = await web3.eth.net.getId();
        if (networkId === 641230) {
            return { isBearNetwork: true };
        } else {
            return { isBearNetwork: false, error: 'Not on Bear Network!' };
        }
    } catch (error) {
        console.error("Error checking network", error);
        return { isBearNetwork: false, error: error.message };
    }
}

// 擴展功能：檢查地址是否為以太坊的0x開頭，並進行基本格式驗證
function isEthereumAddress(address) {
    const { isValid, error } = isValidAddress(address);
    if (!isValid) {
        return { isEthereum: false, error };
    }

    return {
        isEthereum: address.startsWith('0x'),
        error: address.startsWith('0x') ? null : 'Ethereum address should start with "0x"',
    };
}

module.exports = {
    isValidAddress,
    isContractAddress,
    isEthereumAddress,
    checkIfOnBearNetwork,
};
