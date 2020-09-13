import _ from "lodash";
import React, { useContext } from "react";
import { IconWrapper, IconContainer, IconGroup } from "./TableStyle";
import ToolTip from "./tooltip/IconTooltip";

function RowManipulation(props) {
  const {
    data,
    isActive,
    id,
    isShowEdit,
    isShowReject,
    isShowDelete,
    isShowPublish,
    isShowApprove,
    isShowDropdown,
    onPublish,
    onApprove,
    onDelete,
    onReject,
    onEdit
  } = props;
  return (
    <IconContainer>
      <IconGroup isActive={isActive}>
        {isShowEdit && (
          <IconWrapper
            color="#f7a100"
            onClick={() => onEdit(id)}
          >
            <i className="fas fa-edit" style={{ color: "#fff" }} />
            <ToolTip text="Chỉnh sửa" />
          </IconWrapper>
        )}
        {isShowApprove && (
          <IconWrapper
            color="#34c242"
            onClick={() => onApprove(id)}
          >
            <i className="fas fa-check" style={{ color: "#fff" }} />
            <ToolTip text="Duyệt" />
          </IconWrapper>
        )}
        {isShowPublish && (
          <IconWrapper
            color="#34c242"
            onClick={() => onPublish(id)}
          >
            <i className="fas fa-upload" style={{ color: "#fff" }} />
            <ToolTip text="Xuất bản" />
          </IconWrapper>
        )}
        {isShowReject &&
          <IconWrapper color="#4c5054" onClick={() => onReject(id)}>
            <i className="fas fa-times" style={{ color: "#fff" }} />
            <ToolTip text="Từ chối" />
          </IconWrapper>
        }
        {isShowDelete &&
          <IconWrapper color="red" onClick={() => onDelete(id)}>
            <i className="fas fa-trash" style={{ color: "#fff" }} />
            <ToolTip text="Xoá" />
          </IconWrapper>
        }
      </IconGroup>
    </IconContainer>
  );
}

export default RowManipulation;
