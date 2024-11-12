"use client";
import axios from "axios";
import { Transaction, Connection, clusterApiUrl, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {

  const sendSol = async () => {

    try {
      const url = clusterApiUrl("devnet");
      const connection = new Connection(url);

      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: new PublicKey(""),
              toPubkey: new PublicKey(""),
              lamports: LAMPORTS_PER_SOL / 10000   
          })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey("");

      const serializedTx = transaction.serialize({
        requiresAllSignatures: false,
        verifySignatures: false
      });


      const data = await axios.post("http://localhost:3000/api/v2/txn/sign", {
        message: serializedTx,
        username: "abcd@gmail.com"
      });

      console.log("Data", data);

    } catch(err) {
      console.log("Error", err);
    }
  }

  return (
    <div>
      <button onClick={sendSol}>Send</button>
    </div>
  );
}
