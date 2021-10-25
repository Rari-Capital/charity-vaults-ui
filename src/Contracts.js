import { ethers } from 'ethers'
import { CharityVaultAbiFilePath, CharityVaultFactoryAbiFilePath, 
    CharityVaultFactoryDeployedAddress } from './config.js';


export const getCharityVaultContractByAddress = (address, signer) => {
    // The address passed in here is the address of the underlying charity vault we are fetching.
    // This must be retrieved by first using the factory contract to get the underlying address.
    abi = JSON.parse(fs.readFileSync(CharityVaultAbiFilePath).toString());

    contract = new ethers.Contract(address, abi, signer)
    return contract;
}

export const getCharityVaultFactoryContract = (signer) => {
    abi = JSON.parse(fs.readFileSync(CharityVaultFactoryAbiFilePath).toString());

    contract = new ethers.Contract(CharityVaultFactoryDeployedAddress, abi, signer)
    return contract;
}

export const getCharityVaultContract = (underlying_erc20, charity_address, rate, signer) => {
    // This method will return the address of a charity vault given the information above.
    const factory = getCharityVaultFactoryContract(signer);

    // TODO: Now, use the factory Contract object to call getCharityVaultFromUnderlying
    // This is where underlying, address, and rate params will need to be used
    const address = 'insert-here';

    // Once the address is retrieved, pass it into getCharityVaultContractByAddress
    const charity_vault = getCharityVaultContractByAddress(address, signer);
    return charity_vault;
}
