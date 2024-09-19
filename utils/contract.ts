import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { contractABI } from "./contractABI";

const contractAddress = "0x4f4863f9bbbB50d1dEd61252Baee6268fA4bb3Cb";

export const contract= getContract ({
    client: client,
    chain: chain,
    address: contractAddress,
    abi: contractABI,

});