import React from "react";
const btnsDATA = [
  {
    "name": "AC"
    , "id": "clear"
  },
  {
    "name": "←"
    , "id": "back"
  },
  {
    "name": "/"
    , "id": "divide"
  },
  {
    "name": "x"
    , "id": "multiply"
  },
  {
    "name": "7"
    , "id": "seven"
  },
  {
    "name": "8"
    , "id": "eight"
  },
  {
    "name": "9"
    , "id": "nine"
  },
  {
    "name": "-"
    , "id": "subtract"
  },
  {
    "name": "4"
    , "id": "four"
  },
  {
    "name": "5"
    , "id": "five"
  },
  {
    "name": "6"
    , "id": "six"
  },
  {
    "name": "+"
    , "id": "add"
  },
  {
    "name": "1"
    , "id": "one"
  },
  {
    "name": "2"
    , "id": "two"
  },
  {
    "name": "3"
    , "id": "three"
  },
  {
    "name": "="
    , "id": "equals"
  },
  {
    "name": "0"
    , "id": "zero"
  },
  {
    "name": "."
    , "id": "decimal"
  }
];

export const Presentational = (props) => {
  return (
    <Calculator propys={props}/>
  );
}

const Calculator = (props) => {
  props = props.propys;
  return (
    <div id="Calculator">
      <Display 
        formula={props.formula}
        result={props.result}
      />
      <div className="gridContainer">
        {
        btnsDATA.map((btn)=> 
          <CalcButton
            key={btn["id"]}
            id={btn["id"]}
            name={btn["name"]}
            handleClick={props.handleClick}
          />
        )
        }
      </div>
    </div>
  );
}

const Display = (props) => {
  return (
    <div id="screen">
      <div id="formula">
        {props.formula}
      </div>
      <div id="display">
        {props.result}
      </div>
    </div>
  );
}

const CalcButton = (props) => {
  return (
    <div 
      onClick={props.handleClick.bind(this, props.name==="x"?"*":props.name)}
      className="gridChild"
      id={props.id}
    >
      {props.name}
    </div>
  );
}