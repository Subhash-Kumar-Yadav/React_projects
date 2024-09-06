import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  const [length, setLenght] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for(let i = 1; i <= length; i++){
      let index = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(index)
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed, setPassword])


  //copy password
  const copyPasswordFromClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-gray-400 my-10 
      text-orange-500 rounded-lg px-4 py-3">
        <h1 className="text-black text-lg font-bold text-center my-3">Password Generator</h1>
        <div className="flex shadow  overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full rounded-md px-3 py-2"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordFromClipboard}
          className="outline-none bg-blue-700 text-white px-3 shrink-0.5"
          >copy</button>
        </div>

        <div className="flex text-sm gap-x-2 font-semibold">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLenght(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={setCharAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
