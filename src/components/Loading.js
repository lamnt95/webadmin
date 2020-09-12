import React, { useContext } from "react";
import styled from "styled-components";
import { Table, Segment, Dimmer, Loader } from "semantic-ui-react";

const LoadingContainer = styled.div`
  display: flex;
  height: 100vh;
`;

function Loading() {
  return (
    <LoadingContainer>
      <Dimmer active inverted>
        <Loader inverted>Đang tải dữ liệu, vui lòng chờ chút ...</Loader>
      </Dimmer>
    </LoadingContainer>
  );
}

export default Loading;
