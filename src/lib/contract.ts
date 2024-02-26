import { ethers } from "ethers";
import provider from "./provider";
import abi from "@/app/_config/abi.json";

const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_RERRO_ADDRESS!,
  abi,
  provider
);

export default contract;
