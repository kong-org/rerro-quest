import supabase from "@/lib/supabase";
import { ethers } from "ethers";

export default async function getSignatureForAddress(ethAddress: string) {
  const hashedAddress = ethers.utils.keccak256(ethAddress);

  // Query Supabase for the signature corresponding to the hashed Ethereum address
  let { data, error } = await supabase
    .from("certs")
    .select("chipCert")
    .eq("chipHash", hashedAddress)
    .single();

  if (error || !data || !data.chipCert) {
    throw new Error(`Supabase query failed: ${error?.message}`);
  }

  return data.chipCert;
}
