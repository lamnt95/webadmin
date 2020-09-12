import _ from "lodash";
import styled from "styled-components";
import { Table } from "semantic-ui-react";
import { IconToolTipContent } from "./tooltip/IconTooltip";

export const WrapperTable = styled(Table)`
  border: solid 1px #e1dfdf !important;
`;

export const Header = styled(Table.HeaderCell)`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: bold !important;
  color: #757c84 !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  padding-left: ${(props) => (props.isHead ? "20px!important" : "0px")};
`;

export const TableRow = styled(Table.Row)`
  color: ${(props) => (props.isDisable ? "#d6d6d6" : "#575757")};
  background-color: ${(props) => (props.isActive ? "#dfecf9" : "#fff")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#dfecf9" : "#f7f9fc")};
  }
`;

export const Cell = styled(Table.Cell)`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  /* color: #575757; */
  height: 50px;
  max-height: 50px;
  /* padding-top: 15px !important;
  padding-bottom: 15px !important; */
  opacity: ${(props) => (props.isDisable ? "0.2" : "1")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  padding-left: ${(props) =>
    props.isHead ? "20px!important" : "10px!important"};
  padding-right: 10px !important;
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  background-color: ${(props) => props.color};
  cursor: pointer;
  &:hover {
    filter: ${(props) => {
      if (!props.isDisable) return "brightness(120%)";
      return "brightness(100%)";
    }};
  }
  &:hover ${IconToolTipContent} {
    display: flex;
  }
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const IconGroup = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex: 1;
  flex-direction: row;
  justify-content: center;
  ${TableRow}:hover & {
    display: flex;
  }
`;

export default {};
