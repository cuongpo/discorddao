// Import the web3.js library
import Web3 from 'web3';
import  fs from 'fs';
export async function get_exp(memberDiscordId) {
		// Create a new instance of web3 using an HTTP provider
	const web3 = new Web3('https://mantle-testnet.rpc.thirdweb.com');

	// Define the address of the smart contract
	const contractAddress = '0x96B3FF0448A561902485A96e5ef05674a6EA943b';

	// Define the ABI (Application Binary Interface) of the smart contract
	const contractABI = JSON.parse(fs.readFileSync('./src/contractABI.json', 'utf8'));


	// Create an instance of the contract using the contract address and ABI
	const contract = new web3.eth.Contract(contractABI, contractAddress);

	// const memberAddress = '0x5464B7c4be57D23548C3e366221E939ce1e22428';
	try {
        const result = await contract.methods.getExpByDiscordId(memberDiscordId).call();
        // console.log('Member Experience:',memberDiscordId, result);
        return result; // Return the member's experience
    } catch (error) {
        console.error('Error:', error);
        return 0;
    }
}

