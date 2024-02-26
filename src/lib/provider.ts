import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_URI!
);

export const providerMain = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_URI_MAIN!
);

export default provider;
