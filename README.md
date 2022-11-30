# UI and toolkit for testing carbon forwards

This app provides functionality for carbon forwards structuring and issuance on Hedera hashgraph.

## Issuance details

The Project Owner and Project Developer jointly fill in the Issuance Page which has the following content:

- Total carbon amount to be issued (this will limit the total delivery amount in the table)
- Total Vintage Quantity (affect the number of rows in the table)
- Crediting period start, (date of the first vintage) - year 
- Crediting period end, (date of the last vintage) - year 
- Verification period quarter

Distribution (in %) carbon credits (all vintages combined) between project stakeholders - project owner, project developer, investor, auditor, or a separate independent party.

After the information is filled in, the Project Owner presses the ‘Issue’ button, and it is sent to Evercity for confirmation.
After this, carbon forward tokens are issued and automatically transferred to the blockchain wallets of relevant stakeholders including free float - the certain amount of forwards thar are publicly available to investors.

Carbon Forward tokens should contain the following metadata: 

- ID
- Project Name 
- Project Type
- Country 
- Vintage 
- Vallidation date
- Registration date
- Status: issued, executed, canceled
- Projected Execution date: Vintage year + Quarter of verification report
- Sustainable Development Goals 

## #environment variables

- `VITE_WEB3_STORAGE_JWT` - key for storing data on IPFS using web3.storage
- `VITE_NETWORK` - Hedera network: `testnet`|`mainnet`
- `VITE_DEBUG` - show debug data in console: `true` or `false`
