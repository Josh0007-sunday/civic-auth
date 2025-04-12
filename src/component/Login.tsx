// import { useUser } from "@civic/auth-web3/react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useEffect } from "react";

// export default function LoginButton() {
//   const { user, signIn } = useUser();

//   const handleSignIn = async () => {
//     try {
//       await signIn();
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   // Auto-create wallet after successful login
//   useEffect(() => {
//     const createWallet = async () => {
//       if (user && !('solana' in user)) {
//         try {
//           // Type-safe wallet creation
//           const civicUser = user as any; // Temporary workaround
//           if (civicUser.createWallet) {
//             await civicUser.createWallet();
//             console.log("Wallet created successfully");
//           }
//         } catch (error) {
//           console.error("Wallet creation failed:", error);
//         }
//       }
//     };
    
//     createWallet();
//   }, [user]);

//   return (
//     <div>
//       {!user ? (
//         <button onClick={handleSignIn} className="signin-btn">
//           Sign Up with Email
//         </button>
//       ) : (
//         <WalletMultiButton />
//       )}
//     </div>
//   );
// }


import { useUser } from "@civic/auth-web3/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { user, signIn } = useUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  useEffect(() => {
    const createWallet = async () => {
      if (user && !('solana' in user)) {
        try {
          setIsCreating(true);
          const civicUser = user as any;
          if (civicUser.createWallet) {
            await civicUser.createWallet();
            console.log("Wallet created successfully");
          }
        } catch (error) {
          console.error("Wallet creation failed:", error);
        } finally {
          setIsCreating(false);
        }
      }
    };
    
    createWallet();
  }, [user]);

  return (
    <div className="space-y-4">
      {!user ? (
        <button
          onClick={handleSignIn}
          disabled={isCreating}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all
            ${isCreating 
              ? 'bg-indigo-700 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'}
            text-white shadow-md`}
        >
          {isCreating ? 'Creating Wallet...' : 'Sign Up with Email'}
        </button>
      ) : (
        <div className="w-full flex justify-center">
          <WalletMultiButton className="bg-indigo-600 hover:bg-indigo-700 !py-3" />
        </div>
      )}
    </div>
  );
}
