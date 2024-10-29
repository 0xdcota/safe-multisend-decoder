import decodeTxDataMultiSend from './decodeTxDataMultiSend';

const arg1_transactionsBytes = process.argv[2];

if (arg1_transactionsBytes) {
  try {
    const transactions = decodeTxDataMultiSend(arg1_transactionsBytes);
    console.log(transactions);
  } catch (error) {
    console.error('Error decoding transactions:', error.message);
  }
} else {
  console.error('Please provide the encoded transaction bytes as an argument.');
  process.exit(1);
}