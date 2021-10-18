import { createContext } from 'react'

export const RariContextDefaultValue = {
    web3provider: null,
    setProvider: () => {},
}

const RariContext = createContext(RariContextDefaultValue);

export default RariContext;
