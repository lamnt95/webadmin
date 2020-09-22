import _ from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import PostIntroTable from "./PostIntroTable";
import PostIntroForm from "./PostIntroForm";
import Filter from "../Filter"
import api from "../../api"

import { useSelector } from "react-redux"
import axios from "axios"
import { selectors } from "../../app-redux"

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
  const [isShowPostForm, setIsShowForm] = useState(false);
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [postIntroActive, setPostIntroActive] = useState();

  const postIntroActiveData = _.head(_.filter(postIntros, i => i.id === postIntroActive) || []) || {};

  const activeDropdown = _.get(filter, "activeDropdown")
  const accessToken = useSelector(selectors.auth.getAccessToken)

  console.log("postIntros", postIntros)

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    setLoading(true)
    api.queryPostIntro({ checkedStatus: activeDropdown }).then(({ content }) => {
      setPostIntros(content)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [updateAt, accessToken])

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
    setIsShowForm(true)
  }, [1])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelUpdate = useCallback(() => {
    setPostIntroActive()
  }, [1])

  const onCreateNew = () => {
    setIsShowForm(true)
  }

  const onCancelPost = useCallback(() => {
    setPostIntroActive("")
    setIsShowForm(false)
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
          onNew={!isShowPostForm ? onCreateNew : isShowPostForm}
          onCancel={isShowPostForm ? onCancelPost : isShowPostForm}
        />
        {!isShowPostForm && <PostIntroTable
          data={postIntros}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={postIntroActive}
          onUpdateScreen={onUpdateScreen}
          onEdit={onEdit}
          activeDropdown={activeDropdown}
        />}
        {isShowPostForm &&
          <div style={{ marginTop: 15 }}>
            <PostIntroForm
              id={postIntroActive}
              data={postIntroActiveData}
              onCancel={onCancelPost}
              onUpdateScreen={onUpdateScreen}
            /></div>
        }
      </WrapperTable>
    </Container>
  );
}

export default PostIntroScreen;
