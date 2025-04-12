import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import LoginButton from "./component/Login";
import UserProfile from "./component/Home";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181530] to-black">
      <ConnectionProvider endpoint="https://api.devnet.solana.com">
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <CivicAuthProvider 
              clientId={import.meta.env.VITE_CIVIC_CLIENT_ID}
              displayMode="iframe"
              onSignIn={(error) => {
                if (error) {
                  console.error("Sign in error:", error);
                } else {
                  console.log("Sign in successful");
                }
              }}
            >
              <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
                <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-800/50 p-8">
                  <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-8">
                    My Web3 App
                  </h1>
                  <LoginButton />
                  <UserProfile />
                </div>
              </div>
            </CivicAuthProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;