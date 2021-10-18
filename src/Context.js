import { createContext } from 'react'

export const RariContextDefaultValue = {
    web3provider: null,
    web3signer: null,
    setProvider: () => {},
    setSigner: () => {},
}

const RariContext = createContext(RariContextDefaultValue);

export default RariContext;
