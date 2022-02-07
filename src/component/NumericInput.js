import NumericInput from "react-numeric-input";
import styled from "styled-components";

const StyledNumber = styled.div`
  display: flex;
  span {
    input {
      border: none !important;
      color: white;
      background-color: #3b3b3b !important;
      cursor: initial;
    }
  }
`;

export const NumberInput = (props) => {
  return (
    <StyledNumber>
      <NumericInput
        className="mint-form__input w-input eth_input"
        min={props.min}
        max={props.max}
        value={props.value}
        style={false}
        readOnly
        step={1}
      />
      <div className="mint-form__button-wrapper">
        <span
          data-quantity-update="increase"
          className="mint-form__button increase w-button pluson"
          onClick={() => props.value < 5 && props.setAmount(props.value + 1)}
        >
          +
        </span>
        <span
          data-quantity-update="decrease"
          className="mint-form__button decrease w-button minuson"
          onClick={() => props.value > 0 && props.setAmount(props.value - 1)}
        >
          -
        </span>
      </div>
    </StyledNumber>
  );
};
