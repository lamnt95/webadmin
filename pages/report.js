import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import withLayout from "../src/components/withLayout";
import styled from "styled-components";
import { Button } from 'semantic-ui-react'

const Container = styled.div`
  display:flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display:flex;
  margin-left: 20px;
  margin-top: 20px;
`

function ReportScreen() {
  return <Container>
    <div>
    </div>
    <Wrapper>
      <a href="http://202.92.6.130:8080/restaurant-cake-api/v1/admin/order-reports/download">
        <Button color='green'>
          Tải báo cáo sản phẩm
        </Button>
      </a>
    </Wrapper>
    <Wrapper>
      <a href="http://202.92.6.130:8080/restaurant-cake-api/v1/admin/product-reports/download">
        <Button color='blue' >
          Tải báo cáo sản phẩm
        </Button>
      </a>
    </Wrapper>
  </Container>
}

function ReportManagement(props = {}) {
  const { pathname: activedTab } = props;
  return withLayout({ activedTab })(ReportScreen);
}

ReportManagement.getInitialProps = async (ctx = {}) => {
  const { pathname } = ctx;
  return { pathname };
};

export default ReportManagement;
