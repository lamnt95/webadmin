import _ from "lodash";
import React from "react";
import { TableRow, Cell } from "../TableStyle";
import RowManipulation from "../RowManipulation";
import dateUtils from "../../utils/date";

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
  const { data, onCheckOrder, onRejectOrder, onEditOrder, isActive, onDeleteOrder } = props;
  const { id, code, updatedDate,totalCostAfterPromotion } = data || {};
  const isDisable = false;
  const status = getStatus(data)
  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell width={150}>{code}</Cell>
      <Cell>{totalCostAfterPromotion}</Cell>
      <Cell textAlign="center">{dateUtils.formatDate(updatedDate) || ""}</Cell>
      <Cell textAlign="center">{status}</Cell>
      <Cell width={200}>
        <RowManipulation
          id={id}
          isDisable={isDisable}
          isActive={isActive}
          isShowEdit
          isShowReject
          isShowDelete
          isShowApprove
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
