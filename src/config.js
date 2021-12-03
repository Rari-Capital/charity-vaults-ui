import charityVaultABI from './contracts/CharityVault.sol/CharityVault.json';
import charityVaultFactoryABI from './contracts/CharityVaultFactory.sol/CharityVaultFactory.json';
import underlyingABI from './contracts/DemoUSD.sol/DemoUSD.json';

export const CharityVaultABI = charityVaultABI;
export const CharityVaultFactoryABI = charityVaultFactoryABI;
export const UnderlyingABI = underlyingABI;

export const CharityVaultFactoryDeployedAddress = "0x94946353a1cb8949b7e1ab214ddBB77CCEDFDFe1";

export const WalletConnectInfuraId = "782109c6748c48d6b91c3eafa72b5292";
export const Network = "goerli";

export const Tokens = {
    "DUSD": "0x9D0230d259fA6315eCDf5972e4C635babf02599c",
    "USDC": "0x5ffbac75efc9547fbc822166fed19b05cd5890bb",
    "ETH": "insert-here",
}

export const Charities = {
	"Charity 1": "0x05AB381A007A90E541433f3DC574AcD3E389f898",
	"Charity 2": "0xBB379331De54A7c0a4b2bfF5A54A14cdba7E9E6d",
	"Charity 3": "0x77e34153d9CbAD9f457b6DDFa61B721Ec2e92F52"
}

export const interestRateOptions = {
	5: "5%",
	10: "10%",
	15: "15%",
	20: "20%",
	25: "25%"
}
