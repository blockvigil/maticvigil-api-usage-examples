## Working with an ERC20 token contract

The guide will introduce you to working with an ERC20 token contract via the MaticVigil API endpoints.

These steps are also packaged into a CLI tool designed in Python for you to play around with a pre-supplied ERC20 contract.

## Please refer to [this doc](https://maticvigil.com/docs/erc20_example_code) for a walkthrough.

### Populate `settings.json`
Rename `settings.example.json` to `settings.json`

These are the initial contents of the file:

```json
{
  "development": {
    "privatekey": "",
    "contractAddress": "",
    "REST_API_ENDPOINT": "https://mainnet-api.maticvigil.com/v1.0",
    "INTERNAL_API_ENDPOINT": "https://mainnet.maticvigil.com/api",
    "MATICVIGIL_USER_ADDRESS": "0xaddr",
    "MATICVIGIL_API_KEY": "1212-1212-12-12"
  }
}
```
Enter the appropriate values for the following keys
* `privatekey`
* `MATICVIGIL_USER_ADDRESS` -- associated with the above private key
* `MATICVIGIL_API_KEY` -- a token passed in HTTP request headers to authenticate POST calls. Works with GET calls too.

>Hint: If you have `ev-cli` installed, you can use [dumpsettings](https://maticvigil.com/docs/cli_onboarding#backup-settings-and-recover-later) to recover your MaticVigil credentials

Leave the `contractAddress` field as it is.
Fill it up once you deploy the `ERC20Mintable.sol` contract through the python script.

## Setting up webhook listener server

`python webhook_listener.py`

## Interacting with the smart contract

### Work directly with the CLI script
Install the package requirements

`pip install -r requirements.txt`

`python cli.py deploy`

**----OR----**

### Install as an executable

`pip install -e .`

If everything goes well,

`erc20-cli deploy`


## Getting help

`python cli.py --help`

`python cli.py increaseallowance --help`

OR

`erc20-cli --help`
