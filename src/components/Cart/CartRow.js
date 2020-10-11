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

function ProductRow(props) {
  const { data, onCheckOrder, onRejectOrder, onEditOrder, isActive, onDeleteOrder, onUpdateScreen } = props;
  const { id, code, updatedDate, totalCostAfterPromotion, paidStatus, userInfoOrder, receivedDate, dateFinish } = data || {};
  const isDisable = false;
  const status = getStatus(data)
  const [paidStatusTemp, setPaidStatusTemp] = useState();

  useEffect(() => { setPaidStatusTemp(paidStatus) }, [paidStatus])

  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell width={150}>{code}</Cell>
      <Cell>{userInfoOrder.fullName}</Cell>
      <Cell textAlign="center" width={200}>{utils.formatMoney(totalCostAfterPromotion) || ""}</Cell>
      <Cell textAlign="center" width={150}>{dateUtils.formatDate(receivedDate) || ""}</Cell>
      <Cell textAlign="center" width={200}>{dateFinish && dateUtils.formatDate(dateFinish) || "Chưa hoàn tất"}</Cell>
      <Cell textAlign="center" width={150}>{dateUtils.formatDate(updatedDate) || ""}</Cell>
      <Cell textAlign="center" width={200}>{PAID_TEXT[paidStatus] || ""}</Cell>
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
          onApprove={onCheckOrder}
          onReject={onRejectOrder}
          onDelete={onDeleteOrder}
          onEdit={onEditOrder}
        />
      </Cell>
    </TableRow>
  );
}

export default ProductRow;
