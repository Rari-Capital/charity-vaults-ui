import charityVaultABI from './contracts/CharityVault.sol/CharityVault.json';
import charityVaultFactoryABI from './contracts/CharityVaultFactory.sol/CharityVaultFactory.json';
import underlyingABI from './contracts/MockUSD.sol/MockUSD.json';

export const CharityVaultABI = charityVaultABI;
export const CharityVaultFactoryABI = charityVaultFactoryABI;
export const UnderlyingABI = underlyingABI;

export const CharityVaultFactoryDeployedAddress = "0x2a0b356D73C4A4090C1b5ef8209f8961dD53a02D";

export const WalletConnectInfuraId = "782109c6748c48d6b91c3eafa72b5292";
export const Network = "goerli";

export const Tokens = {
    "MUSD": "0xF7b42CE168bE377083aEb1C890925Ab69847c993",
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
