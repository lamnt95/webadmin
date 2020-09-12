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

function CategoriesTableRow(props) {
  const { data, onCheckCategory, onRejectCategory, onEditCategory, isActive, onDeleteCategory,onPublishCategory } = props;
  const { id, name, updatedDate, publish } = data || {};
  const isDisable = false;
  const status = getStatus(data)
  const action = getAction(data)
  const publishStatus = publish ? "Xuất bản" : "Chưa xuất bản"
  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell>{name}</Cell>
      <Cell textAlign="center">{dateUtils.formatDate(updatedDate) || ""}</Cell>
      <Cell textAlign="center">{status}</Cell>
      <Cell textAlign="center">{action}</Cell>
      <Cell textAlign="center">{publishStatus}</Cell>
      <Cell width={200}>
        <RowManipulation
          id={id}
          isDisable={isDisable}
          isActive={isActive}
          isShowEdit
          isShowReject
          isShowDelete
          isShowPublish
          isShowApprove
          onApprove={onCheckCategory}
          onReject={onRejectCategory}
          onDelete={onDeleteCategory}
          onEdit={onEditCategory}
          onPublish={onPublishCategory}
        // updateModifyItem={updateModifyItem}
        // invisibleItem={invisibleItem}
        // visibleItem={visibleItem}
        />
      </Cell>
    </TableRow>
  );
}

export default CategoriesTableRow;
