import React from "react"

import { Button } from "components/avl-components/components/Button"
import { ValueContainer, ValueItem } from "components/avl-components/components/Inputs/parts"
import { verifyValue as utilityVerify, hasValue } from "components/avl-components/components/Inputs/utils"

const Display = d => {
  switch (typeof d) {
    case "object":
      return JSON.stringify(d, null, 3);
    default:
      return d.toString();
  }
};

export default ({ Input, onChange, value, disabled, autoFocus, display = Display, inputProps, type, verify, verifyValue, ...props }) => {
  value = value || [];

  const [node, setNode] = React.useState(null),
    [newItem, setNewItem] = React.useState(null),

    addToArray = React.useCallback(e => {
      const newValue = [...value, newItem];
      onChange(newValue);
      setNewItem(null);
      node && node.focus();
    }, [value, newItem, node, onChange]),

    removeFromArray = React.useCallback(v => {
      onChange(value.filter(vv => vv !== v));
    }, [value, onChange]),

    editItem = React.useCallback(v => {
      setNewItem(v);
      removeFromArray(v);
      node && node.focus();
    }, [node, removeFromArray]),

    buttonDisabled = React.useMemo(() =>
      disabled ||
      !hasValue(newItem) ||
      value.includes(newItem) ||
      !(verifyValue ? verifyValue(newItem) : utilityVerify(newItem, type, verify)) ||
      ((type === "number") && !value.reduce((a, c) => a && (+c !== +newItem), true))
    , [value, newItem, verifyValue, verify, type, disabled]),

    onKeyDown = React.useCallback(e => {
      if (!buttonDisabled && e.keyCode === 13) {
        e.stopPropagation();
        e.preventDefault();
        addToArray();
      }
    }, [addToArray, buttonDisabled]);

  return (
    <div className="w-full">
      <div className="flex">
        <Input value={ newItem } onChange={ setNewItem } { ...props } { ...inputProps }
          disabled={ disabled } autoFocus={ autoFocus } onKeyDown={ onKeyDown }
          placeholder={ `Type a value...`} ref={ setNode }/>
        <Button onClick={ addToArray } className="ml-1"
          disabled={ buttonDisabled }>
          add
        </Button>
      </div>
      { !value.length ? null :
        <div className="mt-1 ml-10">
          <ValueContainer>
            { value.map((v, i) => (
                <ValueItem key={ i } edit={ e => editItem(v) }
                  remove={ e => removeFromArray(v) }>
                  { display(v) }
                </ValueItem>
              ))
            }
          </ValueContainer>
        </div>
      }
    </div>
  )
}
