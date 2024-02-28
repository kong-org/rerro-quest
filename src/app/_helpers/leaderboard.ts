import provider from "@/lib/provider";
import { ethers } from "ethers";

// Function to get minting transactions
async function getMintingTransactions(
  tokenAddress: string,
  fromBlock = 0,
  toBlock = "latest"
) {
  const transferEventSignature = ethers.utils.id(
    "Transfer(address,address,uint256)"
  );
  const nullAddress =
    "0x0000000000000000000000000000000000000000000000000000000000000000";

  const filter = {
    address: tokenAddress,
    fromBlock,
    toBlock,
    topics: [transferEventSignature, nullAddress],
  };

  const logs = await provider.getLogs(filter);

  return logs.map((log) => {
    // The 'to' address has already been correctly extracted from topics[2]
    const to = log.topics[2].replace("0x000000000000000000000000", "0x");

    // Decode only the transferred amount from the data
    const value = ethers.utils.defaultAbiCoder.decode(["uint256"], log.data)[0];

    return {
      to: to,
      value: ethers.utils.formatEther(value),
    };
  });
}

// Function to aggregate minting data and identify top minters
export default async function identifyTopMinters(
  tokenAddress: string,
  fromBlock = 0,
  toBlock = "latest"
) {
  const transactions = await getMintingTransactions(
    tokenAddress,
    fromBlock,
    toBlock
  );

  const mintingData: any = {};

  transactions.forEach((tx) => {
    if (mintingData[tx.to]) {
      mintingData[tx.to] += parseFloat(tx.value);
    } else {
      mintingData[tx.to] = parseFloat(tx.value);
    }
  });

  const sortedMinters = Object.entries(mintingData)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 100);

  return sortedMinters
    .map((minter) => {
      const formatted = {
        player: minter[0],
        score: minter[1],
      };

      return formatted;
    })
    .filter((a) => {
      return a.player !== "0x8e683d27a31a0a085a7b4d433a21eec3ec3cfab7";
    });
}
