import _ from "lodash"
import React from "react";
import { Button, Form } from "semantic-ui-react";
import TextWarning from "./TextWarning";
import MessageError from "./MessageError";
import styled from "styled-components";

const Label = styled.label`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: #606266 !important;
`;

const Input = styled.input`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
`;

const FormButton = styled(Button)`
  font-family: Arial !important;
  font-size: 14px !important;
  color: #fff !important;
  background-color: ${(props) => `${props.color}!important`};
  margin-right: ${(props) => `${props.right}px!important`};
`;

export default function AddImage({ title, onChange, onAdd, errors, images, onFocus, onRemove, value, btnTitle = "Thêm ảnh", errorText = "Không có ảnh nào", mapType }) {
  return <>
    <Label>
      {title}
      <TextWarning />
    </Label>
    <Input
      left={20}
      right={20}
      width={200}
      placeholder={"Nhập đường dẫn ảnh"}
      name="image"
      value={value}
      onInput={onChange}
      type="text"
      onFocus={onFocus}
    />
    <FormButton
      color="#34c242"
      style={{ marginTop: 15 }}
      onClick={onAdd}
      disabled={!_.isEmpty(errors)}
    >
      {btnTitle}
    </FormButton>
    <div style={{ marginTop: 15 }}>
      {_.isEmpty(images) ? errorText : _.map(images, i => <div key={i.id} style={{ flexDirection: "column", display: "flex" }}>
        {i.type && mapType && <div style={{ flexDirection: "row", display: "flex" }}>
          <div style={{ marginRight: 5 }}>-------------{mapType(i.type)}-------------</div>
          <i
            className="fas fa-trash"
            onClick={() => onRemove(i.id)}
            style={{ fontSize: 20, cursor: "pointer", marginLeft: 5 }}
          />
        </div>}
        <div>
          <a href={i.data} target="blank">{i.data}</a>
          {(!i.type && !mapType) && <i
            className="fas fa-trash"
            onClick={() => onRemove(i.id)}
            style={{ fontSize: 20, cursor: "pointer", marginLeft: 5 }}
          />}
        </div>
      </div>)}
    </div>
  </>
}