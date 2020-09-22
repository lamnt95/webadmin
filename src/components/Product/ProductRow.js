import _ from "lodash";
import React from "react";
import { TableRow, Cell } from "../TableStyle";
import RowManipulation from "../RowManipulation";
import dateUtils from "../../utils/date";

function getStatus(data) {
  const { checkedStatus } = data || {};
  if (checkedStatus === "APPROVE") return "Đã duyệt"
  if (checkedStatus === "PENDING") return "Chờ duyệt"
  if (checkedStatus === "REJECT") return "Đã từ chối"
  return "Không xác định"
}

function getAction(data) {
  const { action } = data || {};
  switch (action) {
    case "DELETE":
      return "Xoá"
    case "EDIT":
      return "Sửa"
    case "CREATE":
      return "Tạo mới"
    default:
      return "Không xác định"
  }
}

function ProductRow(props) {
  const { data, onCheckProduct, onRejectProduct, onEditProduct, isActive, onDeleteProduct, activeDropdown } = props;
  const { id, code, name, updatedDate, price } = data || {};
  const isDisable = false;
  const status = getStatus(data)
  const action = getAction(data)
  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell width={50}>{code}</Cell>
      <Cell width={150}>{name}</Cell>
      <Cell>{price}</Cell>
      <Cell textAlign="center">{dateUtils.formatDate(updatedDate) || ""}</Cell>
      <Cell textAlign="center">{status}</Cell>
      <Cell textAlign="center">{action}</Cell>
      <Cell width={200}>
        <RowManipulation
          id={id}
          isDisable={isDisable}
          isActive={isActive}
          isShowEdit={activeDropdown === "APPROVE"}
          isShowReject={activeDropdown === "PENDING"}
          isShowDelete={activeDropdown === "APPROVE"}
          isShowApprove={activeDropdown === "PENDING"}
          onApprove={onCheckProduct}
          onReject={onRejectProduct}
          onDelete={onDeleteProduct}
          onEdit={onEditProduct}
        // updateModifyItem={updateModifyItem}
        // invisibleItem={invisibleItem}
        // visibleItem={visibleItem}
        />
      </Cell>
    </TableRow>
  );
}

export default ProductRow;
