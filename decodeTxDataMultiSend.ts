
export default function decodeTxDataMultisend(encodedBytes: string): Array<{ address: string; value: bigint; data: string }> {
  // Convert hex string to a Uint8Array
  const data = Uint8Array.from(Buffer.from(encodedBytes.slice(2), 'hex'));
  const transactions: Array<{ address: string; value: bigint; data: string }> = [];
  let index = 0;

  while (index < data.length) {
    // Check operation (1 byte)
    const operation = data[index];
    if (operation !== 0x00) {
      throw new Error("Operation byte is not 0x00");
    }
    index += 1;

    // Extract the address (20 bytes)
    const addressBytes = data.slice(index, index + 20);
    const address = `0x${Buffer.from(addressBytes).toString('hex')}`;
    index += 20;

    // Extract the value (32 bytes)
    const valueBytes = data.slice(index, index + 32);
    const value = BigInt(`0x${Buffer.from(valueBytes).toString('hex')}`);
    index += 32;

    // Extract the data length (32 bytes)
    const dataLengthBytes = data.slice(index, index + 32);
    const dataLength = BigInt(`0x${Buffer.from(dataLengthBytes).toString('hex')}`);
    index += 32;

    // Extract the data (length defined by the data length)
    const transactionData = data.slice(index, index + Number(dataLength));
    const dataHex = `0x${Buffer.from(transactionData).toString('hex')}`;
    index += Number(dataLength);

    // Store the decoded transaction
    transactions.push({
      address,
      value,
      data: dataHex,
    });
  }

  return transactions;
}

