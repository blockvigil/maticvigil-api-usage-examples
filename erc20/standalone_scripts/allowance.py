import requests


def main():
    contract_address = "0xDeployedContractAddressHere"
    api_key = '1212-asdxc-333d-sx'
    headers = {'accept': 'application/json', 'Content-Type': 'application/json',
               'X-API-KEY': api_key}
    rest_api_endpoint = 'https://mainnet-api.maticvigil.com/v1.0'
    owner = '0x3dc7d43d5f180661970387a4f89c7e715b567512'
    spender = '0x774246187E1E2205C5920898eEde0945016080Df'
    method_api_endpoint = f'{rest_api_endpoint}/contract/{contract_address}/allowance/{owner}/{spender}'
    r = requests.get(url=method_api_endpoint, headers=headers)
    print(r.text)


if __name__ == '__main__':
    main()
