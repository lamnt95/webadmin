import _ from "lodash";
import React, { useEffect, useState } from "react";
import { TableRow, Cell } from "../TableStyle";
import RowManipulation from "../RowManipulation";
import dateUtils from "../../utils/date";
import { Dropdown, Button } from 'semantic-ui-react'
import api from "../../api"
import utils from "../../utils";

const PAID_TEXT = {
  UNPAID: "Chưa thanh toán",
  FULL_PAID: "Đã thanh toán",
  PARTIALLY_PAID: "Thanh toán một phần",
}


const paidDropdown = [
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

function getStatus(data) {
  const { orderStatus } = data || {};
  if (orderStatus === "NEW") return "Mới"
  if (orderStatus === "CUSTOMER_APPROVE") return "Khách hàng đã duyệt"
  if (orderStatus === "PRODUCE_APPROVE") return "Nhà sản xuất đã duyệt"
  if (orderStatus === "READY_DELIVERY") return "Sẵn sàng giao hàng"
  if (orderStatus === "DELIVERY") return "Đang giao hàng"
  if (orderStatus === "FINISH") return "Hoàn thành"
  if (orderStatus === "FAILURE_DELIVERY") return "Giao hàng thất bại"
  if (orderStatus === "CANCEL") return "Đã huỷ"
  return "Không xác định"
}


const ORDER_TEXT = {
  NEW: "Mới",
  CUSTOMER_APPROVE: "Khách hàng đã duyệt",
  PRODUCE_APPROVE: "Nhà sản xuất đã duyệt",
  READY_DELIVERY: "Sẵn sàng giao hàng",
  DELIVERY: "Đang giao hàng",
  FINISH: "Hoàn thành",
  FAILURE_DELIVERY: "Giao hàng thất bại",
  CANCEL: "Hủy"
}

const orderDropdown = [
  {
    key: 'NEW',
    value: 'NEW',
    text: ORDER_TEXT.NEW,
  },
  {
    key: 'CUSTOMER_APPROVE',
    value: 'CUSTOMER_APPROVE',
    text: ORDER_TEXT.CUSTOMER_APPROVE,
  },
  {
    key: 'PRODUCE_APPROVE',
    value: 'PRODUCE_APPROVE',
    text: ORDER_TEXT.PRODUCE_APPROVE,
  },
  {
    key: 'READY_DELIVERY',
    value: 'READY_DELIVERY',
    text: ORDER_TEXT.READY_DELIVERY,
  },
  {
    key: 'DELIVERY',
    value: 'DELIVERY',
    text: ORDER_TEXT.DELIVERY,
  },
  {
    key: 'FINISH',
    value: 'FINISH',
    text: ORDER_TEXT.FINISH,
  },
  {
    key: 'FAILURE_DELIVERY',
    value: 'FAILURE_DELIVERY',
    text: ORDER_TEXT.FAILURE_DELIVERY,
  },
  {
    key: 'CANCEL',
    value: 'CANCEL',
    text: ORDER_TEXT.CANCEL,
  }
]

function ProductRow(props) {
  const { data, onEditOrder, isActive, onDeleteOrder, onUpdateScreen } = props;
  const { id, code, updatedDate, totalCostAfterPromotion, paidStatus, userInfoOrder, receivedDate, dateFinish, orderStatus } = data || {};
  const isDisable = false;
  const status = getStatus(data)

  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell width={150}>{code}</Cell>
      <Cell>{userInfoOrder.fullName}</Cell>
      <Cell textAlign="center" width={200}>{utils.formatMoney(totalCostAfterPromotion) || ""}</Cell>
      <Cell textAlign="center" width={150}>{dateUtils.formatDate(receivedDate) || ""}</Cell>
      <Cell textAlign="center" width={200}>{dateFinish && dateUtils.formatDate(dateFinish) || "Chưa hoàn tất"}</Cell>
      <Cell textAlign="center" width={150}>{dateUtils.formatDate(updatedDate) || ""}</Cell>
      <Cell textAlign="center" width={200}>{PAID_TEXT[paidStatus] || ""}</Cell>
      <Cell textAlign="center" width={200}>{ORDER_TEXT[orderStatus] || ""}</Cell>
      {/* <Cell>
        <div style={{ display: "flex", flexDirection: "row" }} >
          <Dropdown
            placeholder='Select Friend'
            fluid
            selection
            onChange={(e, { value }) => setPaidStatusTemp(value)}
            value={paidStatusTemp}
            options={paidDropdown}
          />
          <Button onClick={() => api.changeOrderPaidStatus(id, paidStatusTemp).then(onUpdateScreen)}>Đổi</Button>
        </div>
      </Cell> */}
      <Cell width={200}>
        <RowManipulation
          id={id}
          isDisable={isDisable}
          isActive={isActive}
          isShowEdit
          // isShowReject
          isShowDelete={PAID_TEXT[paidStatus] === "CANCEL"}
          // isShowApprove
          isShowDropdown
          onDelete={onDeleteOrder}
          onEdit={onEditOrder}
        />
      </Cell>
    </TableRow>
  );
}

export default ProductRow;
