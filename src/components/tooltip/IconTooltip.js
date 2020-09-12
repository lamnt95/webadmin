import styled from "styled-components";

export const IconToolTipText = styled.div`
  color: #333;
  font-family: Arial !important;
  font-size: 11px !important;
`;

export const IconToolTip = styled.div`
  position: relative;
`;

export const IconToolTipContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  width: 80px;
  transform: translateX(-50%);
  top: 20px;
  background-color: #fff;
  text-align: center;
  border: 1px solid #333;
  border-radius: 2px;
  justify-content: center;
`;

function ToolTip(props) {
  const { text } = props || {};
  return (
    <IconToolTip>
      <IconToolTipContent>
        <IconToolTipText>{text}</IconToolTipText>
      </IconToolTipContent>
    </IconToolTip>
  );
}

export default ToolTip;
