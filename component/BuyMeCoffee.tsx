'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useState } from "react";
import { prepareContractCall, toWei } from "thirdweb";
import { ConnectButton, TransactionButton, useActiveAccount, useContractEvents, useReadContract } from "thirdweb/react";
import { contract } from "../utils/contract";

export const BuyMeCoffee = () => {
    const account = useActiveAccount();
    const [buyAmount, setBuyAmount] = useState(0);
    const [message, setMessage] = useState("");

    const {
        data: totalCoffees,
        refetch: refetchTotalCoffees
    } = useReadContract({
        contract: contract,
        method: "getTotalCoffee",
    });
    const {
        data: contractEvents,
        refetch: refetchContractEvents
    } = useContractEvents({
        contract: contract,
    });

    const truncateWalletAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    const convertDate = (timestamp: bigint) => {
        const timestampNumber = Number(timestamp);
        return new Date(timestampNumber * 1000).toLocaleString();
    };

    if (account) {
        return (
            <div style={{
                border: "1px solid #252525",
                padding: "2rem",
                borderRadius: "6px",
                width: "500px",
            }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <ConnectButton
                        client={client}
                        chain={chain}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "1.15rem" }}>Tip amount</label>
                    <p style={{ fontSize: "10px", color: "#888", marginBottom: "0.5rem" }}>*Must be greater than 0.</p>
                    <input
                        type="number"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(Number(e.target.value))}
                        step={0.01}
                        style={{
                            padding: "0.5rem",
                            border: "none",
                            marginBottom: "1rem",
                        }}
                    />
                    <label style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>Message</label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message..."
                        style={{
                            padding: "0.5rem",
                            border: "none",
                            marginBottom: "1rem",
                        }}
                    />
                    {message && buyAmount > 0 && (
                        <TransactionButton
                            transaction={() => (
                                prepareContractCall({
                                    contract: contract,
                                    method: "buyMeACoffee",
                                    params: [message],
                                    value: BigInt(toWei(buyAmount.toString())),
                                })
                            )}
                            onTransactionConfirmed={() => {
                                alert("Thank you for the coffee!")
                                setBuyAmount(0);
                                setMessage("");
                                refetchTotalCoffees();
                                refetchContractEvents();
                            }}
                            style={{
                                backgroundColor: "royalblue",
                                color: "white",
                                fontSize: "0.75rem",
                                marginBottom: "2rem",
                            }}
                        >Buy Coffee</TransactionButton>
                    )}
                </div>
                <div>
                    <h3 style={{ marginBottom: "1rem" }}>Total Coffees: {totalCoffees?.toString()}</h3>
                    <p style={{ fontSize: "1.15rem" }}>Recent Coffees:</p>
                    {contractEvents && contractEvents.length > 0 && (
                        [...contractEvents].reverse().map((event, index) => (
                            <div key={index}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: "1rem",
                                    margin: "1rem 0",
                                    backgroundColor: "#151515",
                                    borderRadius: "6px",
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}>
                                    <p style={{
                                        fontSize: "12px",
                                        color: "#888",
                                        marginBottom: "0.5rem",
                                    }}>
                                        {/* @ts-ignore */}
                                        {truncateWalletAddress(event.args.sender)}
                                    </p>
                                    <p style={{
                                        fontSize: "12px",
                                        color: "#888",
                                    }}>
                                        {/* @ts-ignore */}
                                        {convertDate(event.args.timestamp)}
                                    </p>
                                </div>
                                <p style={{
                                    color: "#888",
                                }}>
                                    {/* @ts-ignore */}
                                    {event.args.message}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
};