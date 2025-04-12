// import { useUser } from "@civic/auth-web3/react";
// import { useWallet } from "@solana/wallet-adapter-react";

// export default function UserProfile() {
//   const { user } = useUser();
//   const { publicKey } = useWallet();

//   if (!user) return null;

//   return (
//     <div className="profile">
//       <h2>User Details</h2>
//       <p>📧 Email: {user.email || "Not provided"}</p>
//       {publicKey && (
//         <p>🔑 Wallet: <code>{publicKey.toBase58()}</code></p>
//       )}
//     </div>
//   );
// }


import { useUser } from "@civic/auth-web3/react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function UserProfile() {
  const { user } = useUser();
  const { publicKey } = useWallet();

  if (!user) return null;

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">User Details</h2>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium">{user.email || "Not provided"}</p>
          </div>
          
          {publicKey && (
            <div>
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="text-indigo-300 font-mono break-all">{publicKey.toBase58()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}