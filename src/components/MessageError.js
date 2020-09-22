import _ from "lodash"
import styled from "styled-components";

const TextError = styled.div`
  font-family: Arial !important;
  font-size: 12px !important;
  font-weight: normal !important;
  color: red !important;
  margin-top: 10px;
`;

function MessageError(props) {
  const { isShow, messages } = props || {};
  return (isShow || messages) ? _.map(messages, message => <TextError>{message}</TextError>) : null;
}

export default MessageError;
