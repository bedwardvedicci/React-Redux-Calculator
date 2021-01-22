import { createStore } from "redux";

const FORMULA = "FORMULA";
const getFormula = (n) => ({
  type: FORMULA
  , n
});
const initialState = {
  formula: "0"
  , result: "0"
}
const reducer = (state=initialState, action) => {
  switch(action.type) { 
    case FORMULA
    : {
        let frmla = state.formula; 
        const cState = (obj) => Object.assign({}, state, obj);
        if(frmla.split("").find(v=>v==="=")) {
          switch(true) {
            case action.n==="AC"
            : return cState({formula:"0", result:"0"});
            case action.n==="←"
            : return /^[\d.]$/.test(frmla)
              ? cState({formula: "0"})
              : cState({formula: frmla.slice(0, frmla.length-1)});
            case /[\d=.]/.test(action.n)
            : {
              return state;
            }
          }
          const result = state.result;
          return cState({
            formula: /[\d.]+/.test(result)?result+action.n:"0"
            , result :""
          })
        }
        switch(true) {
          case action.n==="AC"
          : return cState({formula:"0", result:"0"});
          case action.n==="←"
            : return /^[\d.]$/.test(frmla)
              ? cState({formula: "0"})
              : cState({formula: frmla.slice(0, frmla.length-1)});
          case action.n==="="
            : {
              let number;
              if(/[/*\-+][./*\-+]?$/.test(frmla)) {
                number = frmla.match(/.+(?=[/*\-+][/*\-+]$)|.+(?=[/*\-+][.]?$)/)[0];
              }else {
                number = frmla?frmla:"";
              }
              const result = Function(`"use strict"; return ${number}`)();
              return cState({
                formula: number?frmla.concat(" = ", result):frmla.concat(result)
                , result
              })
            }
          case /[/*\-+]/.test(action.n) && /[/*\-+]\.$/.test(frmla)
          : {
            return cState({formula: frmla.slice(0, frmla.length-2).concat(action.n), result: action.n});
          }
          case /[/*+]/.test(action.n) && /^$/.test(frmla)
          : {
            return state;
          }
          case /[/*\-+]/.test(action.n) && /[/*\-+]/.test(frmla[frmla.length-1])
          : {
            return frmla[frmla.length-1]===action.n
              ? state
              : action.n === "-"
                ? cState({formula: frmla.concat(action.n), result: action.n})
                : /[/*\-+]/.test(frmla[frmla.length-2])
                  ? cState({formula: frmla.slice(0, frmla.length-2).concat(action.n), result: action.n})
                  : cState({formula: frmla.slice(0, frmla.length-1).concat(action.n), result: action.n})
          }
          case /\d/.test(action.n)
          : {
            return /^.*[/*\-+]0$|^0$/.test(frmla)
              ? cState({formula: frmla.slice(0, frmla.length-1).concat(action.n), result: action.n})
              : cState({formula: frmla.concat(action.n), result: state.result.concat(action.n)})
          }
          case action.n==="."
          : {
            const regexi= /[/*\-+]$|^[\d.]*$|(?<=[/*\-+])[^/*\-+]+$/;
            const match = frmla.match(regexi)[0];
            const deciFound = match.split("").find(v=>v===".");
            return deciFound
              ? state
              : cState({formula: frmla.concat(action.n), result: state.result.concat(action.n)})
          }
        }
        return cState({formula: frmla.concat(action.n), result: action.n});
    };
    default
    : return state;
  };
}

export const store = createStore(reducer);

export const mapS2P = (state) => ({
  formula: state.formula
  , result : state.result
});
export const mapD2P = (dispatch) => ({
  handleClick : (n) => dispatch(getFormula(n))
})