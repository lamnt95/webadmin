import _ from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import PostIntroTable from "./PostIntroTable";
import PostIntroForm from "./PostIntroForm";
import Filter from "../Filter"
import api from "../../api"

const Container = styled.div`
  flex: 1;
  display: flex;
  padding-top: 28px;
  padding-left: 50px;
  padding-right: 50px;
  user-select: none;
`;

const WrapperTable = styled.div`
  display: flex;
  flex: 60;
  margin-right: 36px;
  flex-direction: column;
`;

const WrapperForm = styled.div`
  flex: 30;
`;

const optionsDropdown = [
  {
    key: "APPROVE",
    text: "Đã duyệt",
    value: "APPROVE"
  },
  {
    key: "PENDING",
    text: "Chờ duyệt",
    value: "PENDING"
  },
  {
    key: "REJECT",
    text: "Từ chối duyệt",
    value: "REJECT"
  }
]

const filterInit = {
  activeDropdown: "APPROVE"
}

function PostIntroScreen(props) {
  const { activeModifyItem } = props;

  const [postIntros, setPostIntros] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [postIntroActive, setPostIntroActive] = useState();

  const postIntroActiveData = _.head(_.filter(postIntros, i => i.id === postIntroActive) || []) || {};

  const activeDropdown = _.get(filter, "activeDropdown")

  console.log("postIntros", postIntros)

  useEffect(() => {
    setLoading(true)
    api.queryPostIntro({ checkedStatus: activeDropdown }).then(({ content }) => {
      setPostIntros(content)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [updateAt])

  const onChangeFilter = useCallback((item) => {
    const newFilter = { ...filter, ...item }
    setFilter(newFilter)
    onUpdateScreen()
  }, [filter])

  const onUpdateScreen = useCallback((res) => {
    setUpdateAt(new Date())
  }, [1])

  const onEdit = useCallback((id) => {
    setPostIntroActive(id)
  }, [1])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelUpdate = useCallback(() => {
    setPostIntroActive()
  }, [1])

  return (
    <Container>
      <WrapperTable>
        <Filter
          dropdownPlaceholder="Trạng thái"
          optionsDropdown={optionsDropdown}
          activeDropdown={activeDropdown}
          onChangeFilter={onChangeFilter}
          onSubmit={onUpdateScreen}
          onClear={onClearFilter}
        />
        <PostIntroTable
          data={postIntros}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={postIntroActive}
          onUpdateScreen={onUpdateScreen}
          onEdit={onEdit}
        />
      </WrapperTable>
      <WrapperForm>
        <PostIntroForm
          id={postIntroActive}
          data={postIntroActiveData}
          onCancel={onCancelUpdate}
          onUpdateScreen={onUpdateScreen}
        />
      </WrapperForm>
    </Container>
  );
}

export default PostIntroScreen;
