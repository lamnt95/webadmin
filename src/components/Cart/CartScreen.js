import _, { valuesIn } from "lodash"
import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled from "styled-components";
import CartTable from "./CartTable";
import CartForm from "./CartForm";
import Filter from "../Filter"
import api from "../../api"
import Paging from "../Paging"
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

  const accessToken = useSelector(selectors.auth.getAccessToken)

  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [orders, setOrders] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [orderActive, setOrderActive] = useState();
  console.log("orderActive",orderActive)

  const activeDropdown = _.get(filter, "activeDropdown")
  const targetStatus = useMemo(() => _.get(optionsDropdownKeyBy, [activeDropdown, "next"]), [activeDropdown])

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    setLoading(true)
    const { number: page } = pageInfo || {}
    api.queryOrder({ orderStatus: activeDropdown, page }).then((res) => {
      const { content, number, totalPages } = res || {}
      setOrders(content)
      setLoading(false)
      if (page !== number) {
        setPageInfo({ number, totalPages });
      }
    }).catch(() => setLoading(false))
  }, [updateAt, pageInfo, accessToken])

  const onChangeFilter = useCallback((item) => {
    const newFilter = { ...filter, ...item }
    setFilter(newFilter)
    onUpdateScreen()
  }, [filter])

  const onUpdateScreen = useCallback((res) => {
    setUpdateAt(new Date())
  }, [1])

  const onEditOrder = useCallback((id) => {
    console.log("setOrderActive",id)
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

  const onBack = () => {
    const number = (pageInfo.number - 1 < 0) ? 0 : pageInfo.number;
    setPageInfo({ ...pageInfo, number })
  }

  const onNext = () => {
    const number = (pageInfo.number + 1 > pageInfo.totalPages) ? pageInfo.totalPages : pageInfo.number;
    setPageInfo({ ...pageInfo, number })
  }

  const onClickPaging = (number) => {
    setPageInfo({ ...pageInfo, number })
  }

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
          // onNew={onCreateProduct}
        />
        <CartTable
          data={orders}
          isLoading={isLoading}
          activeItem={orderActive}
          targetStatus={targetStatus}
          onUpdateScreen={onUpdateScreen}
          onEditOrder={onEditOrder}
        />
        <Paging
          total={pageInfo.totalPages}
          current={pageInfo.number}
          onBack={onBack}
          onNext={onNext}
          onClickPaging={onClickPaging}
        />
      </WrapperTable>
      }
      {isCreateOrder && <WrapperForm>
        <CartForm
          id={orderActive}
          onCancel={onCancelUpdate}
        />
      </WrapperForm>}
    </Container>
  );
}

export default CartScreen;
