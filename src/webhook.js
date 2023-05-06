import { config } from 'dotenv';
import Web3 from 'web3';
import { Client, GatewayIntentBits, MessageFlags, Routes, AttachmentBuilder } from 'discord.js';
import discord from 'discord.js';
config();
const client = new discord.Client({
    intents: [],
  });

client.login(process.env.TOKEN);
client.on('ready',() => {
    console.log("bot has logged in" + client.user.tag);
})


const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "addMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "createProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            }
        ],
        "name": "executeProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_discordId",
                "type": "uint256"
            }
        ],
        "name": "linkDiscordId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "ProposalCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_member",
                "type": "address"
            }
        ],
        "name": "removeMember",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_proposalId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "proposalId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenAmount",
                "type": "uint256"
            }
        ],
        "name": "VoteCast",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_discordId",
                "type": "uint256"
            }
        ],
        "name": "getExpByDiscordId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_memberAddress",
                "type": "address"
            }
        ],
        "name": "getMemberExp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "memberInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "memberAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "memberSince",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokenBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "exp",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "discordId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "members",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposals",
        "outputs": [
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "executed",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "votes",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]; 
const contractAddress = "0x96B3FF0448A561902485A96e5ef05674a6EA943b"; 
const eventName = 'ProposalCreated'; // Replace with your event name

// Connect to the Ethereum network
const web3 = new Web3('wss://ws.testnet.mantle.xyz'); // Replace with your Infura project ID or use a local node

// Create a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

contract.events[eventName]({}, async (error, event) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Event:', event.returnValues);
      const proposalId = event.returnValues.proposalId;
      const description = event.returnValues.description;
      const votelink = "https://cuongpo.github.io/discord-dao-ui/";
      try {
        const channel = await client.channels.fetch(process.env.CHANNEL);
        channel.send(`Proposal ID: ${proposalId} created\nDescription: ${description}\nGo to ${votelink} to vote`);
      } catch (err) {
        console.log(err);
      }
    }
  })
  .on('connected', () => {
    console.log('Connected to the event');
  })
  .on('changed', (event) => {
    console.log('Event changed:', event.returnValues);
  })
  .on('error', (error) => {
    console.error('Error:', error);
  });
