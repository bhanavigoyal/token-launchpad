import { useState } from "react"
import { Button } from "./Button"
import { Header } from "./Header"
import { InputBox } from "./InputBox"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { createAssociatedTokenAccountInstruction, createInitializeInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export const TokenLaunchpad=()=>{
    const {connection} = useConnection();
    const wallet = useWallet();

    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [image, setImage] = useState("")
    const [initialSupply, setInitialSupply] = useState(1000000)

    async function createToken(){
        const mintPair = Keypair.generate();
        const metadata = {
            mint: mintPair.publicKey,
            name: name,
            symbol: symbol,
            uri: image,
            additionalMetadata: [initialSupply],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + Buffer.from(JSON.stringify(metadata)).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
        if(!wallet.publicKey) return "no wallet";

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintPair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID
            }),
            createInitializeMetadataPointerInstruction(mintPair.publicKey, wallet.publicKey, wallet.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintPair.publicKey, 9, wallet.publicKey, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintPair.publicKey,
                metadata: mintPair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            })
        );

        transaction.feePayer= wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintPair);

        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${mintPair.publicKey.toBase58()}`)


        const associatedToken = getAssociatedTokenAddressSync(
            mintPair.publicKey,
            wallet.publicKey,
            false,
            TOKEN_2022_PROGRAM_ID,
        );
        
        console.log(`associated token address: ${associatedToken.toBase58()}`);

        const transaction2 = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                associatedToken,
                wallet.publicKey,
                mintPair.publicKey,
                TOKEN_2022_PROGRAM_ID
            )
        );

        await wallet.sendTransaction(transaction2, connection);

        const transaction3 = new Transaction().add(
            createMintToInstruction(mintPair.publicKey, associatedToken, wallet.publicKey, 1000000000, [], TOKEN_2022_PROGRAM_ID)
        );

        await wallet.sendTransaction(transaction3, connection);

    }
    return(
        <>
      <div className="w-full flex flex-col items-center">
          <Header/>
          <div className="w-2/5">
            <InputBox heading="Name" type="text" placeholder="Solana" onChange={(e)=>{
                setName(e.target.value)
            }}/>
            <InputBox heading="Symbol" type="text" placeholder="SOL" onChange={(e)=>{
                setSymbol(e.target.value)
            }}/>
            <InputBox heading="Initial Supply" type="number" placeholder="100000" onChange={(e)=>{
                setInitialSupply(e.target.value)
            }}/>
            <InputBox heading="Image URL" type="text" placeholder="" onChange={(e)=>{
                setImage(e.target.value)
            }}/>
          </div>
          <Button label="Create" onClick={createToken}/>
      </div>
    </>
    )
}
