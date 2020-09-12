import styled from "styled-components";
import { Button, Input, Dropdown } from "semantic-ui-react";

const BtnClearFilterContainer = styled(Button)`
  font-family: Arial !important;
  font-size: 14px !important;
  cursor: pointer;
  color: #fff !important;
  font-weight: 300 !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
  padding: 0px !important;
  background-color: #fff !important;
  color: #868282 !important;
  text-decoration: underline !important;
  text-decoration-color: #868282;
  &:hover {
    filter: brightness(120%);
  }
`;

export default function BtnClearFilter(props) {
  const { onClick, isDisabled } = props;
  return (
    <BtnClearFilterContainer onClick={onClick} disabled={isDisabled}>
      Xoá lọc
    </BtnClearFilterContainer>
  );
}
