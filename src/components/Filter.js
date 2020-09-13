import _ from "lodash";
import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { Button, Input, Dropdown } from "semantic-ui-react";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const styles = {
  input: {
    fontFamily: "Arial",
    fontSize: "14px !important",
  },
  dropdown: {
    fontFamily: "Arial",
    maxWidth: "196px",
    fontSize: "14px !important",
    marginRight: "10px",
  },
};

function getOptionDropdown(categoryList) {
  return _.map(categoryList, ({ id, name }) => ({
    key: id,
    text: name,
    value: id,
  }));
}

function mapStateToProps(state) {
  return {
    categoryList: store.selectors.categoryList.getCategoryList(state),
  };
}

const ButtonSearchContainer = styled.div`
  background: #2185d0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.28571429rem;
  border-right: 0px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: ${(props) => (props.left ? `${props.left}px` : "10px")};
  margin-right: ${(props) => (props.right ? `${props.right}px` : "10px")};
  cursor: pointer;
  &:hover {
    filter: brightness(120%);
  }
`;
const ButtonSearchTitle = styled.div`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
`;

const FormButton = styled(Button)`
  font-family: Arial !important;
  font-size: 14px !important;
  color: #fff !important;
  background-color: ${(props) => `${props.color}!important`};
  font-weight: 300 !important;
  margin-left: 10px !important;
  margin-right: 10px !important;
  &:hover {
    filter: brightness(120%);
  }
`;

function Filter(props) {
  const { dropdownPlaceholder, optionsDropdown, onChangeFilter, activeDropdown, onClear, onSubmit, onNew, onCancel } = props || {};
  let inputKeyword = useRef(null);

  const handleClearFilter = () => {
    inputKeyword.value = "";
    onClear();
  };

  const onChangekeyword = (value, name) => {
    onChangeFilter({ [name]: value });
  };

  const onChangeDropdown = (e, data) => {
    const { value } = data || {};
    onChangeFilter({ activeDropdown: value });
  };

  return (
    <Container>
      <Dropdown
        style={styles.dropdown}
        placeholder={dropdownPlaceholder || "Chọn tiêu chí"}
        clearable
        selection
        value={activeDropdown || ""}
        options={optionsDropdown}
        onChange={onChangeDropdown}
      />
      <Input type="text" placeholder="Tìm theo từ khoá">
        <input
          style={styles.input}
          name="keyword"
          onChange={(e) => onChangekeyword(e.target.value, "keyword")}
          ref={(element) => (inputKeyword = element)}
        />
      </Input>
      <ButtonSearchContainer
        onClick={() => {
          onSubmit();
        }}
        left={10}
      >
        <ButtonSearchTitle>Tìm kiếm</ButtonSearchTitle>
      </ButtonSearchContainer>
      <FormButton
        color="#a2adb5"
        onClick={handleClearFilter}
      >
        Xoá lọc
      </FormButton>
      {_.isFunction(onNew) && <FormButton
        color="green"
        onClick={onNew}
      >
        Tạo mới
      </FormButton>}
      {_.isFunction(onCancel) && <FormButton
        color="gray"
        onClick={onCancel}
      >
        Huỷ
      </FormButton>}
    </Container>
  );
}

export default Filter;
