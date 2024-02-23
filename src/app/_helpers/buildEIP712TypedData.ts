export default function buildEIP712TypedData(
  chainId: string,
  verifyingContractAddress: string,
  transaction: any
) {
  const domain = {
    name: "MinimalForwarder",
    version: "0.0.2",
    chainId: chainId,
    verifyingContract: verifyingContractAddress,
  };

  const types = {
    ForwardRequest: [
      { type: "address", name: "to" },
      { type: "uint256", name: "value" },
      { type: "uint256", name: "gas" },
      { type: "uint48", name: "deadline" },
      { type: "uint256", name: "salt" },
      { type: "bytes", name: "data" },
    ],
  };

  const value = {
    to: transaction.to,
    value: transaction.value,
    gas: transaction.gas,
    deadline: transaction.deadline,
    salt: transaction.salt,
    data: transaction.data,
  };

  return {
    types,
    domain,
    value,
  };
}
