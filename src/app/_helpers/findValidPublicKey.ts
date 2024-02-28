import supabase from "@/lib/supabase";
import { ethers } from "ethers";
import getSignatureForAddress from "./getSignatureForAddress";

export default async function findValidPublicKey(publicKeys: string[]) {
  for (const publicKey of publicKeys) {
    const potentialAddress = ethers.utils.computeAddress("0x" + publicKey);

    try {
      const cert = await getSignatureForAddress(potentialAddress);

      if (cert) {
        return { publicKey: publicKey, address: potentialAddress, cert: cert };
      }
    } catch (err) {}
  }
  throw new Error("No valid public key found");
}
