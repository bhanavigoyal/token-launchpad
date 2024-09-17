import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { InputBox } from "./components/InputBox"

function App() {

  return (<>
      <div className="h-screen bg-zinc-950 w-full text-zinc-100 font-mono flex flex-col items-center">
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

export default App
