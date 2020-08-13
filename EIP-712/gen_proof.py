from eip712_structs import EIP712Struct, Address, String, Uint


class Identity(EIP712Struct):
    userId = Uint(256)
    wallet = Address()


class Message(EIP712Struct):
    actionType = String()
    timestamp = Uint(256)
    authorizer = Identity


class EIP712Domain(EIP712Struct):
    name = String()
    version = String()
    chainId = Uint(256)
    verifyingContract = Address()


verifying_contract_domain = EIP712Domain(
    name='VerifierApp101',
    version='1',
    chainId=8995,
    verifyingContract='0x8c1eD7e19abAa9f23c476dA86Dc1577F1Ef401f5'
)

user_identification = Identity(userId=123, wallet='0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC')
msg = Message(actionType='Action7440', timestamp=1570112162, authorizer=Identity)

print(msg.to_message_json(verifying_contract_domain))
print(msg.signable_bytes(verifying_contract_domain))