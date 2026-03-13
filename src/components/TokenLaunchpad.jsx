import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"


export const TokenLaunchpad = () => {

    const { connection } = useConnection();
    const wallet = useWallet();

    const createToken = async () => {
        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID)
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`)
    }

    return (
        <>
            <div className="h-screen w-max-7xl flex flex-col justify-center items-center bg-zinc-800 gap-4">
                <h1 className="text-4xl font-semibold text-white">Solana Token Launchpad</h1>
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded" type="text" placeholder="Name"></input>
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded" type="text" placeholder="Symbol"></input>
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded" type="text" placeholder="Image URL"></input>
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded" type="text" placeholder="Initial Supply"></input>
                <button onClick={createToken} className="btn border text-white border-black px-20 py-2 cursor-pointer rounded bg-violet-800">Create a Token</button>
            </div >
        </>
    )
}