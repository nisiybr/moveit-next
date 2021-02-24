import { useCallback, useState } from "react";

interface ButtonProps {
  children: string;

}

function Button(props:ButtonProps) {
  const [counter, setCounter] = useState(0)

  const handleIncrement = useCallback(() => {
    setCounter(counter+1);
  },[counter])


  return (
    <button type='button' onClick={handleIncrement} >{`${props.children} ${counter}`}</button>
  )
}
export default Button;