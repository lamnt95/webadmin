import _, { valuesIn } from "lodash"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled from "styled-components";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
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
  activeDropdown: "APPROVE",
}

function ProductScreen(props) {
  const { activeModifyItem } = props;

  const [isCreateProduct, setIsCreateProduct] = useState(false);
  const [products, setProducts] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [productActive, setProductActive] = useState();

  const [categories, setCategories] = useState();
  const categoriesDropdown = useMemo(() => {
    return _.map(categories, (item = {}) => ({ key: item.id, value: item.id, text: item.name }))
  }, [categories])

  const activeDropdown = _.get(filter, "activeDropdown")
  const activeDropdown2 = _.get(filter, "activeDropdown2")
  const productCode = _.get(filter, "productCode")
  const accessToken = useSelector(selectors.auth.getAccessToken)

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    
    setLoading(true)
    api.queryProduct({ checkedStatus: activeDropdown, categoryId: activeDropdown2, productCode }).then(({ content }) => {
      setProducts(content)
      setLoading(false)
    }).catch(() => setLoading(false))
    api.queryCategory({ size: 10000 }).then(({ content }) => setCategories(content));
  }, [updateAt, accessToken])

  const onChangeFilter = useCallback((item) => {
    const newFilter = { ...filter, ...item }
    setFilter(newFilter)
    onUpdateScreen()
  }, [filter])

  const onUpdateScreen = useCallback((res) => {
    setUpdateAt(new Date())
  }, [1])

  const onEditProduct = useCallback((id) => {
    setProductActive(id)
    setIsCreateProduct(true)
  }, [1])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelUpdate = useCallback(() => {
    setProductActive()
    setIsCreateProduct(false)
  }, [1])

  const onCreateProduct = useCallback(() => {
    setIsCreateProduct(true)
  }, [1])

  const onChangeSearch = (productCode) => {
    const newFilter = { ...filter, productCode }
    setFilter(newFilter)
  }

  return (
    <Container>
      {!isCreateProduct && <WrapperTable>
        <Filter
          dropdownPlaceholder="Trạng thái"
          optionsDropdown={optionsDropdown}
          activeDropdown={activeDropdown}
          onChangeFilter={onChangeFilter}

          dropdownPlaceholder2="Chuyên mục"
          optionsDropdown2={categoriesDropdown}
          activeDropdown2={activeDropdown2}
          onChangeFilter2={onChangeFilter}

          onChangeSearch={onChangeSearch}
          onSubmit={onUpdateScreen}
          onClear={onClearFilter}
          onNew={onCreateProduct}
        />
        <ProductTable
          data={products}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={productActive}
          onUpdateScreen={onUpdateScreen}
          onEditProduct={onEditProduct}
          activeDropdown={activeDropdown}
        />
      </WrapperTable>}
      {isCreateProduct && <WrapperForm>
        <ProductForm
          id={productActive}
          onCancel={onCancelUpdate}
          onUpdateScreen={onUpdateScreen}
        />
      </WrapperForm>}
    </Container>
  );
}

export default ProductScreen;
