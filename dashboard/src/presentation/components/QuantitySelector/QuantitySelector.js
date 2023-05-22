import { useCallback, useEffect, useState } from "react";
import increase from "./increase";
import decrease from "./decrease";
import './style.css'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const QuantitySelector = ({ value = 0, max, min, onChange }) => {
  const [quantity, setQuantity] = useState(value);

  const onIncrease = useCallback(() => {
    setQuantity((prev) => increase({ previousQuantity: prev, max }).quantity);
  }, []);

  const onDecrease = useCallback(() => {
    setQuantity((prev) => decrease({ previousQuantity: prev, min }).quantity);
  }, []);

  useEffect(() => {
    setQuantity(value)
  }, [value])

  useEffect(() => {
    if (onChange)
      onChange(quantity)
  }, [quantity])

  return (
    <div className="container">
      <AiOutlineMinusCircle size={14} className="button" onClick={onDecrease}>dec</AiOutlineMinusCircle>
      <p className="noselect">{quantity}</p>
      <AiOutlinePlusCircle size={14} className="button" onClick={onIncrease}>inc</AiOutlinePlusCircle>
    </div>
  );
};

export default QuantitySelector;
