import _ from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { Icon, Accordion } from "semantic-ui-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { actions, selectors } from "../app-redux"


const PushContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0px !important;
`;

const ATag = styled.a`
  color: #fff;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  user-select: none;
  height: 60px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16) !important;
  border: solid 1px #ffffff !important;
  border-left: none;
  border-right: none;
  padding-left: 50px;
  padding-right: 50px;
`;
const LeftContainer = styled.div`
  display: flex;
  font-family: Arial !important;
  font-size: 18px !important;
  flex-direction: row;
  align-items: center;
  padding-right: 20px;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled.div`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  text-align: center;
  color: #409eff;
  margin-right: 30px;
`;
const Logout = styled.div`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #409eff;
  margin-left: 5px;
`;
// const IconMenu = styled(FontAwesomeIcon)`
//   margin-right: 20px;
// `;
// const IconLogout = styled(FontAwesomeIcon)`
//   cursor: pointer;
// `;
// const IconArcordionTitle = styled(FontAwesomeIcon)`
//   cursor: pointer;
// `;
const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;
const SegmentContainer = styled.div`
  padding: 0px !important;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const SidebarContainer = styled.div`
  background-color: #314684;
  min-width: 180px !important;
  min-height: 100vh;
`;
const SidebarTitleContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;
const SidebarTitle = styled.div`
  font-family: Arial !important;
  font-size: 20px !important;
  font-weight: normal;
  text-align: center;
  color: #f5f7fa;
`;
const Container = styled.div``;

const AccordionTitleContainer = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding-left: 17px;
  padding-right: 5px;
`;

const AccordionTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AccordionIconDropdown = styled(Icon)`
  color: #fff;
`;

const AccordionTitle = styled.div`
  font-family: Arial !important;
  font-size: 16px !important;
  font-weight: normal;
  color: #f5f7fa;
  margin-left: 10px;
`;

const AccordionTitleGroup = styled(Accordion.Title)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`;

const AccordionContent = styled(Accordion.Content)`
  padding-top: 0px !important;
  padding-bottom: 0px !important;
`;

const AccordionContentItemContainer = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  padding-left: 40px;
  align-items: center;
  cursor: pointer;
  height: 50px;
  background-color: ${(props) => (props.isActive ? "#4965b8" : "transparent")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#4965b8" : "#4965b859")};
  }
`;

const ItemTitle = styled.div`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #f5f7fa;
`;

const knowledgeOptions = [
  {
    id: "/category",
    route: "/category",
    title: "Loại sản phẩm",
    headerTitle: "Danh sách các loại sản phẩm",
  },
  {
    id: "/product",
    route: "/product",
    title: "Sản phẩm",
    headerTitle: "Danh sách sản phẩm",
  },
  {
    id: "/cart",
    route: "/cart",
    title: "Đơn hàng",
    headerTitle: "Danh sách đơn hàng",
  },
  {
    id: "/promotion",
    route: "/promotion",
    title: "Khuyến mại",
    headerTitle: "Danh sách khuyến mại",
  },
  {
    id: "/postIntro",
    route: "/postIntro",
    title: "Giới thiệu",
    headerTitle: "Thông tin giới thiệu của trang chủ",
  },
  {
    id: "/post",
    route: "/post",
    title: "Bài viết",
    headerTitle: "Quản lý bài viết",
  },
  {
    id: "/report",
    route: "/report",
    title: "Báo cáo",
    headerTitle: "Quản lý báo cáo",
  },
  {
    id: "/user",
    route: "/user",
    title: "Thành viên",
    headerTitle: "Quản lý thành viên",
  },
];

const goodsOptions = [
  {
    id: "/house",
    route: "/house",
    title: "SEO",
    headerTitle: "SEO",
  },
];

const goodsOptionsKeyBy = _.keyBy(goodsOptions, "id");
const knowledgeOptionsKeyBy = _.keyBy(knowledgeOptions, "id");

const arcordionConfig = [
  {
    id: "knowledge",
    title: "Sản phẩm",
    data: knowledgeOptions,
  },
  {
    id: "goods",
    title: "Cài đặt",
    data: goodsOptionsKeyBy,
  },
];

function getArcordionActiveByTabActive(activedTab = "") {
  const arcordionActiveItem =
    _.find(arcordionConfig, ({ data }) =>
      _.find(data, ({ id }) => id === activedTab)
    ) || {};
  const { id } = arcordionActiveItem;
  return id || "knowledge";
}

function AccordionSideBar(props = {}) {
  const { activedTab } = props;
  const arcordionActiveCurrent = getArcordionActiveByTabActive(activedTab);
  const [arcordionActive, setArcordionActive] = useState(
    arcordionActiveCurrent
  );
  return (
    <Accordion>
      {_.map(arcordionConfig, ({ id, data, title }) => {
        return (
          <>
            <AccordionTitleGroup
              key={id}
              active={arcordionActive === id}
              index={id}
              onClick={() => setArcordionActive(id)}
            >
              <AccordionTitleContainer>
                <AccordionTitleWrapper>
                  {/* <IconArcordionTitle
                    icon={faBook}
                    fontSize={20}
                    color="#A2B9F7"
                  /> */}
                  <AccordionTitle>{title}</AccordionTitle>
                </AccordionTitleWrapper>
                <AccordionIconDropdown name="dropdown" />
              </AccordionTitleContainer>
            </AccordionTitleGroup>
            <AccordionContent active={arcordionActive === id}>
              {_.map(data, ({ title, id: itemId, route }) => (
                <Link href={route}>
                  <ATag href={route}>
                    <AccordionContentItemContainer
                      key={itemId}
                      isActive={itemId === activedTab}
                    >
                      <ItemTitle>{title}</ItemTitle>
                    </AccordionContentItemContainer>
                  </ATag>
                </Link>
              ))}
            </AccordionContent>
          </>
        );
      })}
    </Accordion>
  );
}

const withLayout = (props = {}) => (WrapperConponent) => {
  const { activedTab } = props;
  const { headerTitle } = knowledgeOptionsKeyBy[activedTab] || {};
  const router = useRouter();
  const dispatch = useDispatch();
  const accessUser = useSelector(selectors.auth.getAccessUser) || ""

  const onSubmitSuccess = () => {
    router.push("/login")
  }

  const onSubmit = () => {
    dispatch(actions.auth.logoutStart(null, { onSuccess: onSubmitSuccess }))
  }

  return (
    <Container>
      <PushContainer>
        <SidebarContainer>
          <SidebarTitleContainer>
            <SidebarTitle>Trang Admin</SidebarTitle>
          </SidebarTitleContainer>
          <AccordionSideBar activedTab={activedTab} />
        </SidebarContainer>

        <SegmentContainer>
          <HeaderContainer>
            <LeftContainer>
              {/* <IconMenu icon={faList} fontSize={20} color="#6F6F6F" /> */}
              {headerTitle}
            </LeftContainer>
            <RightContainer>
              <Username>{accessUser}</Username>
              <LogoutContainer>
                {/* <IconLogout icon={faSignOutAlt} fontSize={20} color="#409eff" /> */}
                <Logout onClick={onSubmit}>Đăng xuất</Logout>
              </LogoutContainer>
            </RightContainer>
          </HeaderContainer>
          {<WrapperConponent {...props} />}
        </SegmentContainer>
      </PushContainer>
    </Container>
  );
};

export default withLayout;
