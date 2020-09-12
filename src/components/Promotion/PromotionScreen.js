import _, { valuesIn } from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import PromotionTable from "./PromotionTable";
import PromotionForm from "./PromotionForm";
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

function ProductScreen(props) {
  const { activeModifyItem } = props;

  const [isCreateProduct, setIsCreateProduct] = useState(false);
  const [products, setProducts] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [productActive, setProductActive] = useState();

  const activeDropdown = _.get(filter, "activeDropdown")

  useEffect(() => {
    setLoading(true)
    api.queryPromotions({ checkedStatus: activeDropdown }).then(({ content }) => {
      setProducts(content)
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

  return (
    <Container>
      {!isCreateProduct && <WrapperTable>
        <Filter
          dropdownPlaceholder="Trạng thái"
          optionsDropdown={optionsDropdown}
          activeDropdown={activeDropdown}
          onChangeFilter={onChangeFilter}
          onSubmit={onUpdateScreen}
          onClear={onClearFilter}
          onNew={onCreateProduct}
        />
        <PromotionTable
          data={products}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={productActive}
          onUpdateScreen={onUpdateScreen}
          onEditProduct={onEditProduct}
        />
      </WrapperTable>}
      {isCreateProduct && <WrapperForm>
        <PromotionForm
          id={productActive}
          onCancel={onCancelUpdate}
          onUpdateScreen={onUpdateScreen}
        />
      </WrapperForm>}
    </Container>
  );
}

export default ProductScreen;
