import { ConnectEmbed } from "@/app/thirdweb";
import { chain } from "./chain";
import { client } from "./client";

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
        <h1>Buy Me A Coffee</h1>
        <ConnectEmbed 
        client={client}
        chain={chain}
        />
    </div>
  );
}
