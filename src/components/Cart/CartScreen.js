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
import utils from "../../utils";
import moment from "moment";

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


const PAID_TEXT = {
  UNPAID: "Chưa thanh toán",
  FULL_PAID: "Đã thanh toán",
  PARTIALLY_PAID: "Thanh toán một phần",
  ALL: "Tất cả"
}


const paidDropdown = [
  {
    key: 'ALL',
    value: '',
    text: PAID_TEXT.ALL,
  },
  {
    key: 'UNPAID',
    value: 'UNPAID',
    text: PAID_TEXT.UNPAID,
  },
  {
    key: 'FULL_PAID',
    value: 'FULL_PAID',
    text: PAID_TEXT.FULL_PAID,
  },
  {
    key: 'PARTIALLY_PAID',
    value: 'PARTIALLY_PAID',
    text: PAID_TEXT.PARTIALLY_PAID,
  }
]

const optionsDropdown = [
  {
    key: "ALL",
    text: "Tất cả",
    value: "",
  },
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


const filterInit2 = {
  activeDropdown: "UNPAID"
}



function CartScreen(props) {

  const accessToken = useSelector(selectors.auth.getAccessToken)

  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [orders, setOrders] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [filter2, setFilter2] = useState(filterInit2);
  const [receivedDate, setReceivedDate] = useState(null)
  const [toReceivedDate, setToReceivedDate] = useState(null)
  const [fromDateFinish, setFromDateFinish] = useState(null)
  const [toDateFinish, setToDateFinish] = useState(null)

  console.log("receivedDate", receivedDate)
  const [isLoading, setLoading] = useState(false);
  const [orderActive, setOrderActive] = useState();

  const activeDropdown = _.get(filter, "activeDropdown")
  const activeDropdown2 = _.get(filter2, "activeDropdown")

  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    setLoading(true)
    const { number: page } = pageInfo || {}
    api.queryOrder({
      orderStatus: activeDropdown, paidStatus: activeDropdown2, page,
      fromReceivedDate: receivedDate != null ? utils.formatYYYMMDD(receivedDate) : "",
      toReceivedDate: toReceivedDate != null ? utils.formatYYYMMDD(toReceivedDate) : "",
      fromDateFinish: fromDateFinish != null ? utils.formatYYYMMDD(fromDateFinish) : "",
      toDateFinish: toDateFinish != null ? utils.formatYYYMMDD(toDateFinish) : ""
    }).then((res) => {
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

  const onChangeFilter2 = useCallback((item) => {
    const newFilter = { ...filter2, ...item }
    setFilter2(newFilter)
    onUpdateScreen()
  }, [filter2])

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
          optionsDropdown2={paidDropdown}
          activeDropdown={activeDropdown}
          activeDropdown2={activeDropdown2}

          onChangeFilter={onChangeFilter}
          onChangeFilter2={onChangeFilter2}

          onSubmit={onUpdateScreen}
          onClear={onClearFilter}

          isShowReceivedDate
          receivedDate={receivedDate}
          onChangeReceiveDate={(date) => {
            // const dateNew = moment(date).subtract(1,"days");
            setReceivedDate(date);
            setToReceivedDate(date);
            onUpdateScreen()
          }}

          isShowFromDateFinish
          fromDateFinish={fromDateFinish}
          onChangeFromDateFinish={(date) => {
            setFromDateFinish(date);
            onUpdateScreen()
          }}

          isShowToDateFinish
          toDateFinish={toDateFinish}
          onChangeToDateFinish={(date) => {
            setToDateFinish(date);
            onUpdateScreen()
          }}
        />
        <CartTable
          data={orders}
          isLoading={isLoading}
          activeItem={orderActive}
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
          onUpdateScreen={onUpdateScreen}
        />
      </WrapperForm>}
    </Container>
  );
}

export default CartScreen;
