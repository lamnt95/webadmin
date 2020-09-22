import _ from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import CategoriesTable from "./CategoriesTable";
import CategoriesForm from "./CategoriesForm";
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

function CategoriesScreen(props) {
  const { activeModifyItem } = props;

  const [categories, setCategories] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [categoryActive, setCategoryActive] = useState();
  const [isShowPostForm, setIsShowForm] = useState(false);

  const activeDropdown = _.get(filter, "activeDropdown")
  const accessToken = useSelector(selectors.auth.getAccessToken)

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    setLoading(true)
    api.queryCategory({ checkedStatus: activeDropdown }).then(({ content }) => {
      setCategories(content)
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

  const onEditCategory = useCallback((id) => {
    setCategoryActive(id)
    setIsShowForm(true)
  }, [1])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelUpdate = useCallback(() => {
    setCategoryActive()
    setIsShowForm(false)
  }, [1])


  const onCreateNew = () => {
    setIsShowForm(true)
  }

  const onCancelPost = useCallback(() => {
    setCategoryActive("")
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
          onNew={!isShowPostForm ? onCreateNew : () => { }}
          onCancel={isShowPostForm ? onCancelPost : () => { }}
        />
        {!isShowPostForm && <CategoriesTable
          data={categories}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={categoryActive}
          onUpdateScreen={onUpdateScreen}
          onEditCategory={onEditCategory}
          activeDropdown={activeDropdown}
        />}
        {isShowPostForm && <div style={{ marginTop: 15 }}>
          <CategoriesForm
            id={categoryActive}
            onCancel={onCancelUpdate}
            onUpdateScreen={onUpdateScreen}
          />
        </div>}
      </WrapperTable>
    </Container>
  );
}

export default CategoriesScreen;
