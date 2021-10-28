import { ethers } from 'ethers'
import {
    CharityVaultABI, CharityVaultFactoryABI,
    CharityVaultFactoryDeployedAddress
} from './config.js';

export const getCharityVaultContractByAddress = (address, signer) => {
    // The address passed in here is the address of the underlying charity vault we are fetching.
    // This must be retrieved by first using the factory contract to get the underlying address.
    const contract = new ethers.Contract(address, CharityVaultABI.abi, signer)
    return contract;
}

export const getCharityVaultFactoryContract = (signer) => {
    const contract = new ethers.Contract(CharityVaultFactoryDeployedAddress, CharityVaultFactoryABI.abi, signer)
    return contract;
}

export const getCharityVaultContract = async (underlying_erc20, charity_address, rate, signer) => {
    // This method will return the address of a charity vault given the information above.
    const factory = getCharityVaultFactoryContract(signer);

    // TODO: Now, use the factory Contract object to call getCharityVaultFromUnderlying
    // This is where underlying, address, and rate params will need to be used
    const deployedCharityVaultAddress = await factory.getCharityVaultFromUnderlying(underlying_erc20, charity_address, rate);
    const charityVaultIsDeployed = await factory.isCharityVaultDeployed(deployedCharityVaultAddress);

    // Once the address is retrieved, pass it into getCharityVaultContractByAddress
    if (charityVaultIsDeployed) {
        const charity_vault = getCharityVaultContractByAddress(deployedCharityVaultAddress, signer);
        return charity_vault;
    } else {
        return null;
    }
}
