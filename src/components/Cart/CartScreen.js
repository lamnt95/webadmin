import _, { valuesIn } from "lodash"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled from "styled-components";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
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
    key: "NEW",
    text: "Mới",
    value: "NEW",
    next: "CUSTOMER_APPROVE"
  },
  {
    key: "CUSTOMER_APPROVE",
    text: "Khách hàng đã duyệt",
    value: "CUSTOMER_APPROVE",
    next: "PRODUCE_APPROVE",
  },
  {
    key: "PRODUCE_APPROVE",
    text: "Nhà sản xuất đã duyệt",
    value: "PRODUCE_APPROVE",
    next: "READY_DELIVERY",
  },
  {
    key: "READY_DELIVERY",
    text: "Sẵn sàng giao hàng",
    value: "READY_DELIVERY",
    next: "DELIVERY",
  },
  {
    key: "DELIVERY",
    text: "Đang giao hàng",
    value: "DELIVERY",
    next: "FINISH",
  },
  {
    key: "FINISH",
    text: "Hoàn thành",
    value: "FINISH",
  },
  {
    key: "FAILURE_DELIVERY",
    text: "Giao hàng thất bại",
    value: "FAILURE_DELIVERY",
  },
  {
    key: "CANCEL",
    text: "Đã huỷ",
    value: "CANCEL"
  }
]

const optionsDropdownKeyBy = _.keyBy(optionsDropdown, "key")

const filterInit = {
  activeDropdown: "NEW"
}

function CartScreen(props) {

  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [orders, setOrders] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [orderActive, setOrderActive] = useState();

  const activeDropdown = _.get(filter, "activeDropdown")
  const targetStatus = useMemo(() => _.get(optionsDropdownKeyBy, [activeDropdown, "next"]), [activeDropdown])

  useEffect(() => {
    setLoading(true)
    api.queryOrder({ orderStatus: activeDropdown }).then(({ content }) => {
      setOrders(content)
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

  const onEditOrder = useCallback((id) => {
    setOrderActive(id)
    setIsCreateOrder(true)
  }, [1])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelUpdate = useCallback(() => {
    setOrderActive()
    setIsCreateOrder(false)
  }, [1])

  const onCreateProduct = useCallback(() => {
    setIsCreateOrder(true)
  }, [1])

  return (
    <Container>
      {!isCreateOrder && <WrapperTable>
        <Filter
          dropdownPlaceholder="Trạng thái"
          optionsDropdown={optionsDropdown}
          activeDropdown={activeDropdown}
          onChangeFilter={onChangeFilter}
          onSubmit={onUpdateScreen}
          onClear={onClearFilter}
          onNew={onCreateProduct}
        />
        <CartTable
          data={orders}
          isLoading={isLoading}
          activeItem={orderActive}
          targetStatus={targetStatus}
          onUpdateScreen={onUpdateScreen}
          onEditOrder={onEditOrder}
        />
      </WrapperTable>}
      {isCreateOrder && <WrapperForm>
        <CartForm
          id={orderActive}
          onCancel={onCancelUpdate}
          onUpdateScreen={onUpdateScreen}
        />
      </WrapperForm>}
    </Container>
  );
}

export default CartScreen;
