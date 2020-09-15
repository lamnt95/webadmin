import wrapperNextWithStore from "../src/hoc/wrapperNextWithStore";
import _ from "lodash";
import { checkIsServer } from "../src/utils/server";
import withLayout from "../src/components/withLayout";

function ReportScreen(){
  return <div>ReportScreen</div>
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
