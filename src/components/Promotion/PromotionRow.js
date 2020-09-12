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

function getPromotionType(data) {
  const { promotionType } = data || {};
  switch (promotionType) {
    case "CATEGORY":
      return "Loại chuyên mục"
    case "PRODUCT":
      return "Loại sản phẩm"
    case "COUPON":
      return "Lọai coupon"
    default:
      return "Không xác định"
  }
}

function ProductRow(props) {
  const { data, onCheckProduct, onRejectProduct, onEditProduct, isActive, onDeleteProduct,checkedStatus } = props;
  const { id,effectiveDate,expiredDate } = data || {};
  const isDisable = false;
  const status = getStatus(data)
  const actionText = getAction(data)
  const promotionType = getPromotionType(data);
  return (
    <TableRow isActive={isActive} isDisable={isDisable}>
      <Cell width={150}>{id}</Cell>
      <Cell>{promotionType}</Cell>
      <Cell textAlign="center">{dateUtils.formatDate(effectiveDate) || ""}</Cell>
      <Cell textAlign="center">{dateUtils.formatDate(expiredDate) || ""}</Cell>
      <Cell textAlign="center">{status}</Cell>
      <Cell textAlign="center">{actionText}</Cell>
      <Cell width={200}>
        <RowManipulation
          id={id}
          isDisable={isDisable}
          isActive={isActive}
          isShowEdit
          isShowApprove={checkedStatus==="PENDING"}
          isShowReject={checkedStatus==="PENDING"}
          isShowDelete={checkedStatus==="APPROVE"}
          onApprove={onCheckProduct}
          onReject={onRejectProduct}
          onDelete={onDeleteProduct}
          onEdit={onEditProduct}
        />
      </Cell>
    </TableRow>
  );
}

export default ProductRow;
