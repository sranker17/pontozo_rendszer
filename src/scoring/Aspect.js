import { useContext } from 'react';
import Select from 'react-select';
import { DataContext } from './DataContext';
import { ErrorContext } from './ErrorContext';
import classNames from 'classnames';

export function Aspect({ aspect, taskName }) {
  const [errors, setErrors] = useContext(ErrorContext);
  const [data, setData] = useContext(DataContext);
  const classes = classNames("form-control", {"is-invalid": hasError()});

  const numberHandler = (e) => {
    if (e.target.value !== null && e.target.value.trim() !== "" && !isNaN(e.target.value) && e.target.value >= 0 && e.target.value <= aspect["maxValue"]) {
      if (!hasTarget()) {
        setData([...data, 
          {taskName: taskName, id: parseInt(e.target.id), required: (aspect["required"]) ? true : false, inputValue: parseInt(e.target.value), type: aspect["type"]}
        ]);
        setErrors(
          errors.filter(function (value, _index, _arr){
            return parseInt(value.aspectId) !== parseInt(e.target.id);
          })
        );
      }
    }
    else {
      if (hasTarget()) {
        setData(
          data.filter(function (value, _index, _arr) {
            return parseInt(value.id) !== parseInt(e.target.id);
          })
        );
      }
    }

    if(e.target.value === null || e.target.value.trim() === ""){
      if (hadError()) {
        if(aspect["required"]){
          changeError("Kötelező kitölteni!");
        }
        else{
          setErrors(
            errors.filter(function (value, _index, _arr){
              return parseInt(value.aspectId) !== parseInt(e.target.id);
            })
          );
        }
      }
      else{
        if(aspect["required"]){
          makeError("Kötelező kitölteni!");
        }
      }
    }
    else if(isNaN(e.target.value)){
      if (hadError()) {
        changeError("Számot kell megadni!");
      }
      else{
        makeError("Számot kell megadni!");
      }
    }
    else if(e.target.value < 0 || e.target.value > aspect["maxValue"]){
      if (hadError()) {
        changeError(`0 és ${aspect["maxValue"]} közötti számot kell megadni!`);
      }
      else{
        makeError(`0 és ${aspect["maxValue"]} közötti számot kell megadni!`);
      }
    }
  };

  function makeError(msg){
    setErrors([...errors, 
      {taskName:taskName, aspectName: aspect["name"], aspectId: aspect["id"], msg: msg}
    ]);
  }

  function changeError(msg) {
    const oldErrors = errors.filter(function (value, _index, _arr) {
      return parseInt(value.aspectId) !== parseInt(aspect["id"]);
    });
    setErrors([...oldErrors, 
      {taskName:taskName, aspectName: aspect["name"], aspectId: aspect["id"], msg: msg}
    ]);
  }

  function hadError() {
    let has = false;
    for(const idx in errors){
      if(parseInt(errors[idx].aspectId) === parseInt(aspect["id"])){
        has = true;
      }
    }
    return has;
  }

  const listHandler = (e) =>{
    if(hasTarget()){
      const oldData = data.filter(function (value, _index, _arr) {
        return value.id !== aspect["id"];
      });
      setData([...oldData,
        {taskName: taskName, id: parseInt(aspect["id"]), required: (aspect["required"]) ? true : false, inputValue: parseInt(e.value), type: aspect["type"]}
      ]);
    }
    else{
      setData([...data, 
        {taskName: taskName, id:  parseInt(aspect["id"]), required: (aspect["required"]) ? true : false, inputValue: parseInt(e.value), type: aspect["type"]}
      ]);
      setErrors(
        errors.filter(function (value, _index, _arr){
          return parseInt(value.aspectId) !== parseInt(aspect["id"]);
        })
      );
    }
    
  }

  const booleanHandler = (e) =>{
    if(hasTarget()){
      const newData = data.filter(function (value, _index, _arr) {
        return value.id !== aspect["id"];
      });
      setData([...newData,
        {taskName: taskName, id:  parseInt(aspect["id"]), required: false, inputValue: parseInt(e.value), type: aspect["type"]}
      ]);
    }
    else{
      setData([...data, 
        {taskName: taskName, id:  parseInt(aspect["id"]), required: false, inputValue: parseInt(e.value), type: aspect["type"]}
      ]);
    }
  }

  function hasTarget() {
    let has = false;
    for(const idx in data){
      if(parseInt(data[idx].id) === parseInt(aspect["id"])){
        has = true;
      }
    }
    return has;
  }
  
  function hasError() {
    let has = false;
    for(const idx in errors){
      if(parseInt(errors[idx].aspectId) === parseInt(aspect["id"])){
        has = true;
      }
    }
    return has;
  }

  function getError() {
    let error = "";
    for(const idx in errors){
      if(parseInt(errors[idx].aspectId) === parseInt(aspect["id"])){
        error = errors[idx].msg;
      }
    }
    return error;
  }

  const options = [];
  if(aspect["values"]){
    for(const key in aspect["values"]){
      options.push({value: aspect["values"][key], label: key});
    }
  }

  return (
    <>
      <tr>
        <td className="text-center align-middle">
          {(aspect["required"] && aspect["type"] !== "boolean") ? aspect["name"] + "*" : aspect["name"]}
        </td>
        <td className="text-center align-middle">
          {aspect["type"] === "number" ? (
            <div className=" w-25 input-group mb-1 mx-auto">
              <input
                type="text"
                className={classes}
                id={aspect["id"]}
                onChange={numberHandler}
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  {"/" + aspect["maxValue"]}
                </div>
              </div>
              
            </div>
          ) : ("")}

          {aspect["type"] === "list" ? (
            <div className=" w-50 mb-1 mx-auto">
              <Select id={aspect["id"]} options={options} onChange={listHandler}/>
            </div>
          ) : ("")}

          {aspect["type"] === "boolean" ? (
            <div className=" w-50 mb-1 mx-auto">
              <Select id={aspect["id"]} options={[{value: aspect["value"], label: "Igaz"}, {value: 0, label: "Hamis"}]} onChange={booleanHandler}/>
            </div>
          ) : ("")}

          {!aspect["type"] ? (
            "Nincs típus megadva"
          ) : ("")}

          {hasError() ? (
          <div className='alert alert-danger w-50 mx-auto'>
            {getError()}
          </div> 
          ): ""}

        </td>
        <td className="text-center align-middle">
          {aspect["description"]
            ? aspect["description"]
            : "Nincs leírás megadva"}
        </td>
      </tr>
    </>
  );
}
