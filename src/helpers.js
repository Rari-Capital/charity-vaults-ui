import { Charities, Tokens } from './config'


export const getTokenFromAddress = (address) => {
    for (const [key, value] of Object.entries(Tokens)) {
        if(value.toLowerCase() === address.toLowerCase()) {
            return key;
        }
    }
    return address;
}

export const getCharityFromAddress = (address) => {
    for (const [key, value] of Object.entries(Charities)) {
        if(value.toLowerCase() === address.toLowerCase()) {
            return key;
        }
    }
    return address;
}
