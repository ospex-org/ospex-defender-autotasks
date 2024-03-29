const { ethers } = require("ethers");
const { DefenderRelaySigner, DefenderRelayProvider } = require('defender-relay-client/lib/ethers');

// Entrypoint for the Autotask
exports.handler = async function(event) {
  // Load value provided in the webhook payload (not available in schedule or sentinel invocations)
  const value = event.request.body;

  // Initialize defender relayer provider and signer
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, 
   { speed: 'fast' });

  const ADDRESS = '0x046dC94519b23c9272712d18Bc00fA73eEd8CF2D';
  const ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_speculationScorer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addSpeculationType",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newMax",
				"type": "uint256"
			}
		],
		"name": "changeMaxSpeculationAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newVoidTime",
				"type": "uint256"
			}
		],
		"name": "changeVoidTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_contributionAmount",
				"type": "uint256"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_DAOAddress",
				"type": "address"
			},
			{
				"internalType": "contract IERC20",
				"name": "_usdc",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_speculationSpreadScorer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_speculationTotalScorer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_speculationMoneylineScorer",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountSpeculated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "contributionAmount",
				"type": "uint256"
			}
		],
		"name": "ContributionMayNotExceedTotalAmount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_speculationAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_contributionAmount",
				"type": "uint256"
			},
			{
				"internalType": "enum PositionType",
				"name": "_positionType",
				"type": "uint8"
			}
		],
		"name": "createPosition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_contestId",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "_lockTime",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_speculationScorer",
				"type": "address"
			},
			{
				"internalType": "int32",
				"name": "_theNumber",
				"type": "int32"
			}
		],
		"name": "createSpeculation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			}
		],
		"name": "forfeitSpeculation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "IneligibleForWinnings",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			}
		],
		"name": "lockSpeculation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			}
		],
		"name": "scoreSpeculation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountSpeculated",
				"type": "uint256"
			}
		],
		"name": "SpeculationAmountIsAboveMaximum",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountSpeculated",
				"type": "uint256"
			}
		],
		"name": "SpeculationAmountNotAboveMinimum",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "SpeculationHasStarted",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "SpeculationMayNotBeForfeited",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "SpeculationMayNotBeVoided",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "SpeculationStatusIsClosed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "SpeculationStatusIsNotClosed",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "TimerHasNotExpired",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			}
		],
		"name": "WinningsAlreadyClaimed",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contributionAmount",
				"type": "uint256"
			}
		],
		"name": "Claim",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "contributionAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum PositionType",
				"name": "positionType",
				"type": "uint8"
			}
		],
		"name": "PositionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "contestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "lockTime",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "speculationScorer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "int32",
				"name": "theNumber",
				"type": "int32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "speculationCreator",
				"type": "address"
			}
		],
		"name": "SpeculationCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "contestId",
				"type": "uint256"
			}
		],
		"name": "SpeculationLocked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "speculationId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "contestId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "upperAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lowerAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum WinSide",
				"name": "winSide",
				"type": "uint8"
			}
		],
		"name": "SpeculationScored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "speculationScorer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "SpeculationTypeAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_DAOAddress",
				"type": "address"
			}
		],
		"name": "updateDAOAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_speculationId",
				"type": "uint256"
			}
		],
		"name": "voidSpeculation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DAOAddress",
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
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSpeculationAmount",
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
		"inputs": [],
		"name": "minSpeculationAmount",
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
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "positions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "upperAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lowerAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "claimed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RELAYER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SCOREMANAGER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "speculationId",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "speculations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "contestId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "upperAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lowerAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "lockTime",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "speculationScorer",
				"type": "address"
			},
			{
				"internalType": "int32",
				"name": "theNumber",
				"type": "int32"
			},
			{
				"internalType": "address",
				"name": "speculationCreator",
				"type": "address"
			},
			{
				"internalType": "enum SpeculationStatus",
				"name": "speculationStatus",
				"type": "uint8"
			},
			{
				"internalType": "enum WinSide",
				"name": "winSide",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "speculationTimerInterval",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "speculationTimers",
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
		"name": "speculationTypes",
		"outputs": [
			{
				"internalType": "contract ISpeculationScorer",
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
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdc",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voidTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  // Create contract instance from the signer and use it to send a tx
  const contract = new ethers.Contract(ADDRESS, ABI, signer);
  
  const tx = await contract.scoreSpeculation(value);
  
  console.log(`Called add in ${tx.hash}`);
  return { tx: tx.hash };
}
