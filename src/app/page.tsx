import { ConnectEmbed } from "@/app/thirdweb";
import { chain } from "./chain";
import { client } from "./client";
import { BuyMeCoffee } from "../../component/BuyMeCoffee";

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh',
      marginTop: '2rem',
      }} >
        <h1 style={{marginBottom: "1rem"}}>Buy Me A Coffee</h1>
        <ConnectEmbed 
        client={client}
        chain={chain}
        />
        <BuyMeCoffee />
    </div>
  );
}
