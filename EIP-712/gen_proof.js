const ethUtil = require('ethereumjs-util');
const abi = require('ethereumjs-abi');
//const chai = require('chai');

const typedData = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Identity: [
            { name: 'userId', type: 'string' },
            { name: 'wallet', type: 'address' }
        ],
        Message: [
            { name: 'actionType', type: 'string' },
            { name: 'timestamp', type: 'uint256' },
            { name: 'authorizer', type: 'Identity' }
        ],
    },
    primaryType: 'Message',
    domain: {
        name: 'VerifierApp101',
        version: '1',
        chainId: 8995,
        verifyingContract: '0x8c1eD7e19abAa9f23c476dA86Dc1577F1Ef401f5',
    },
    message: {
        actionType: 'Action7440',
        timestamp: 1570112162,
        authorizer: {
            userId: 123,
            wallet: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
        },
    },
};

const types = typedData.types;

// Recursively finds all the dependencies of a type
function dependencies(primaryType, found = []) {
    if (found.includes(primaryType)) {
        return found;
    }
    if (types[primaryType] === undefined) {
        return found;
    }
    found.push(primaryType);
    for (let field of types[primaryType]) {
        for (let dep of dependencies(field.type, found)) {
            if (!found.includes(dep)) {
                found.push(dep);
            }
        }
    }
    return found;
}

function encodeType(primaryType) {
    // Get dependencies primary first, then alphabetical
    let deps = dependencies(primaryType);
    deps = deps.filter(t => t != primaryType);
    deps = [primaryType].concat(deps.sort());

    // Format as a string with fields
    let result = '';
    for (let type of deps) {
        result += `${type}(${types[type].map(({ name, type }) => `${type} ${name}`).join(',')})`;
    }
    return result;
}

function typeHash(primaryType) {
    return ethUtil.keccak256(encodeType(primaryType));
}

function encodeData(primaryType, data) {
    let encTypes = [];
    let encValues = [];

    // Add typehash
    encTypes.push('bytes32');
    encValues.push(typeHash(primaryType));

    // Add field contents
    for (let field of types[primaryType]) {
        let value = data[field.name];
        if (field.type == 'string' || field.type == 'bytes') {
            encTypes.push('bytes32');
            value = ethUtil.keccak256(value);
            encValues.push(value);
        } else if (types[field.type] !== undefined) {
            encTypes.push('bytes32');
            value = ethUtil.keccak256(encodeData(field.type, value));
            encValues.push(value);
        } else if (field.type.lastIndexOf(']') === field.type.length - 1) {
            throw 'TODO: Arrays currently unimplemented in encodeData';
        } else {
            encTypes.push(field.type);
            encValues.push(value);
        }
    }

    return abi.rawEncode(encTypes, encValues);
}

function structHash(primaryType, data) {
    return ethUtil.keccak256(encodeData(primaryType, data));
}

function signHash() {
    return ethUtil.keccak256(
        Buffer.concat([
            Buffer.from('1901', 'hex'),
            structHash('EIP712Domain', typedData.domain),
            structHash(typedData.primaryType, typedData.message),
        ]),
    );
}

//const privateKey = ethUtil.keccak256('cow');
const privateKey = Buffer.from("70b714739efeca3e1621480124ba1823bd6f0f3727281e5ea604032fd8f7687e", 'hex');
const address = ethUtil.privateToAddress(privateKey);
const sig = ethUtil.ecsign(signHash(), privateKey);
console.log('R: ', '0x'+sig.r.toString('hex'));
console.log('S: ', '0x'+sig.s.toString('hex'));
console.log('V: ', sig.v);
console.log('Signing address: ', address.toString('hex'));