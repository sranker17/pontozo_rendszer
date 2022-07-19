import { ErrorContext } from "./ErrorContext";
import { useContext, useEffect } from "react";

export function Errors({required}) {
  const [errors, setErrors] = useContext(ErrorContext);

  useEffect(()=>{
    if(errors.length===0){
      for(const idx in required){
        setErrors(prevErrors => [...prevErrors, 
            {taskName: required[idx]["taskName"], aspectName: required[idx]["aspectName"], aspectId: required[idx]["aspectId"], msg: "Kötelező kitölteni!"}
        ]);
      }
    }
  },[]);

  return (
    <>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          {errors.map((error) => (
            <li key={error["aspectId"]}>{error["taskName"]}, {error["aspectName"]}: {error["msg"]} </li>
          ))}
        </div>
      ) : ("")}
    </>
  );
}
