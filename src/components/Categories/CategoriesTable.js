import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import CategoriesTableRow from "./CategoriesTableRow";
import Loading from "../Loading";
import api from "../../api"

function CategoriesTable(props) {

  const { data, isLoading, onUpdateScreen, onEditCategory,activeItem, activeDropdown } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheckCategory = useCallback((id) => {
    api.checkCategory(id).then(onUpdateScreen)
  }, [1])

  const onRejectCategory = useCallback((id) => {
    api.rejecyCategory(id).then(onUpdateScreen)
  }, [1])

  const onDeleteCategory = useCallback((id) => {
    api.deleteCategory(id).then(onUpdateScreen)
  }, [1])

  const onPublishCategory = useCallback((id) => {
    api.publishCategory(id).then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>Mã</Header>
          <Header>Tên</Header>
          <Header textAlign="center" width={180}>
            Ngày cập nhật
          </Header>
          <Header textAlign="center" width={100}>
            Trạng thái
          </Header>
          <Header textAlign="center" width={100}>
            Hành động
          </Header>
          <Header textAlign="center" width={100}>
            Xuất bản
          </Header>
          <Header textAlign="center" width={120}>
            Thao tác
          </Header>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, (item, index) => (
          <CategoriesTableRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheckCategory={onCheckCategory}
            onRejectCategory={onRejectCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
            onPublishCategory={onPublishCategory}
            activeDropdown={activeDropdown}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default CategoriesTable;
