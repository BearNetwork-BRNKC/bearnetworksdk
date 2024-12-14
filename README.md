# 熊網鏈 SDK (Bear Network SDK)

熊網鏈 SDK 是一個基於 [Web3.js](https://web3js.readthedocs.io/) 的工具包，旨在幫助開發者輕鬆集成熊網鏈 (Bear Network Chain, BRNKC) 的功能。該 SDK 包含地址驗證、網絡檢查、交易與錢包交互等常用功能，並支持與 MetaMask 錢包的無縫連接。

---

## 功能特點

1. **網絡檢查**
   - 確認當前是否連接到熊網鏈 (Bear Network Chain)。

2. **地址驗證**
   - 驗證用戶輸入的地址是否為合法的區塊鏈地址。

3. **智能合約地址檢查**
   - 確認指定的地址是否為智能合約地址。

4. **MetaMask 支援**
   - 通過 MetaMask 完成帳戶連接和交易。

5. **高度可擴展**
   - 提供模組化設計，可根據項目需求自定義功能。

---

## 安裝

通過 Git 下載安裝：

```bash
git clone https://github.com/your-repository/bearnetworksdk.git

cd bearnetworksdk

npm install web3
```

---

## 快速開始

### 1. 錢包自定義參數

在使用 SDK 前，請將 MetaMask 或其他支持自定義 RPC 的錢包配置如下：

- **RPC URL**: `https://brnkc-mainnet.bearnetwork.net`
- **鏈 ID**: `641230`
- **代幣名稱**: `BRNKC`

### 2. 初始化 SDK

在使用 SDK 前，確保環境中安裝了 [MetaMask](https://metamask.io/) 並完成上述錢包配置。

```javascript
const Web3 = require('web3');
const { checkIfOnBearNetwork } = require('./utils');

const web3 = new Web3(window.ethereum);

// 初始化 SDK 並檢查 MetaMask 連接
async function initializeSdk() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);

        // 檢查是否在熊網鏈上
        const networkStatus = await checkIfOnBearNetwork(web3);
        if (!networkStatus.isBearNetwork) {
            console.error(networkStatus.error);
        } else {
            console.log('You are on Bear Network!');
        }
    } catch (error) {
        console.error('Failed to initialize SDK:', error);
    }
}

initializeSdk();
```

---

## 接口文檔

### `checkIfOnBearNetwork(web3)`
檢查當前網絡是否為熊網鏈。

- **參數**: 
  - `web3` (Web3 實例): Web3 的初始化實例。
- **返回值**:
  - `isBearNetwork` (布林值): 是否為熊網鏈。
  - `error` (字串): 如果非熊網鏈，返回錯誤信息。

### `isValidAddress(address)`
驗證給定地址是否為合法的區塊鏈地址。

- **參數**: 
  - `address` (字串): 欲驗證的地址。
- **返回值**:
  - `isValid` (布林值): 地址是否合法。
  - `error` (字串): 如果地址無效，返回錯誤信息。

### `isContractAddress(web3, address)`
檢查指定地址是否為智能合約地址。

- **參數**: 
  - `web3` (Web3 實例): Web3 的初始化實例。
  - `address` (字串): 欲檢查的地址。
- **返回值**:
  - `isContract` (布林值): 是否為智能合約地址。
  - `address` (字串): 原始地址。
  - `error` (字串): 如果檢查過程中出現錯誤，返回錯誤信息。

---

## 貢獻指南

1. Fork 本倉庫。
2. 創建特性分支 (`git checkout -b feature/your-feature`)。
3. 提交更改 (`git commit -m 'Add your feature'`)。
4. 推送到分支 (`git push origin feature/your-feature`)。
5. 提交 Pull Request。

---

## 聯繫我們

如果您在使用 SDK 的過程中有任何問題，歡迎通過以下方式聯繫我們：

- **網站**: [Bear Network Official](https://bearnetwork.net/)
- **Email**: bearnetwork.net@gmail.com
