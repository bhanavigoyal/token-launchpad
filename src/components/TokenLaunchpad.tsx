import { Button } from "./Button"
import { Header } from "./Header"
import { InputBox } from "./InputBox"

export const TokenLaunchpad=()=>{
    return(
        <>
      <div className="w-full flex flex-col items-center">
          <Header/>
          <div className="w-2/5">
            <InputBox heading="Name" type="text" placeholder="Solana"/>
            <InputBox heading="Symbol" type="text" placeholder="SOL"/>
            <InputBox heading="Initial Supply" type="number" placeholder="100000"/>
            <InputBox heading="Image URL" type="text" placeholder=""/>
          </div>
          <Button label="Create"/>
      </div>
    </>
    )
}