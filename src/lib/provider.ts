import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_URI!
);

export default provider;
