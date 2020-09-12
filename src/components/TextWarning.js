import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: ${(props) => (props.color ? `${props.color}!important` : "606266")};
  margin-left: ${(props) => (props.left ? `${props.left}px` : "none")};
  margin-right: ${(props) => (props.right ? `${props.right}px` : "none")};
`;

function TextWarning(props) {
  const { content = "*", color, left, right } = props || {};
  return (
    <Container color={color || "red"} left={left || 5} right={right || 5}>
      {content}
    </Container>
  );
}

export default TextWarning;
