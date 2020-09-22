import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import ProductRow from "./ProductRow";
import Loading from "../Loading";
import api from "../../api"

function ProductTable(props) {

  const { data, isLoading, onUpdateScreen, onEditProduct, activeItem, activeDropdown } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheckProduct = useCallback((id) => {
    api.checkProduct(id).then(onUpdateScreen)
  }, [1])

  const onRejectProduct = useCallback((id) => {
    api.rejectProduct(id).then(onUpdateScreen)
  }, [1])

  const onDeleteProduct = useCallback((id) => {
    api.deleteProduct(id).then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>Mã</Header>
          <Header>Tên</Header>
          <Header>Giá</Header>
          <Header textAlign="center" width={180}>
            Ngày cập nhật
          </Header>
          <Header textAlign="center" width={100}>
            Trạng thái
          </Header>
          <Header textAlign="center" width={100}>
            Hành động
          </Header>
          <Header textAlign="center" width={120}>
            Thao tác
          </Header>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, (item, index) => (
          <ProductRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheckProduct={onCheckProduct}
            onRejectProduct={onRejectProduct}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
            activeDropdown={activeDropdown}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default ProductTable;
