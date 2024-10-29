# safe-multisend-decoder

This tool helps you decode independent of SafeApp frontend the payload you are about to sign. 
The output is a console log of an array of the transactions in the payload.

The format of the log is :
```
[
  {
    address: `0x....`
    value: bigInt
    data: `0x....` // function calldata payload
  }
]
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun decode:transactionBytes `0x00<address><value-uint256><payload-length-unit256><payload-bytes>`
```

Example

```
bun decode:transactionBytes 0x00C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000088095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000
```

It should return:
```
[
  {
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // weth address eth-mainnet
    value: 0n, // no transfer of eth
    data: "0x095ea7b3000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa960450000000000000000000000000000000000000000000000000de0b6b3a7640000", // for ref: approve(address,uint), where address = vitalik.eth, uint = 1 eth
  }
]
```


This project was created using `bun init` in bun v1.1.32. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
