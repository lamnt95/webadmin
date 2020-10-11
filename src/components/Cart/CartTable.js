import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import CartRow from "./CartRow";
import Loading from "../Loading";
import api from "../../api"

function CartTable(props) {

  const { data, isLoading, onUpdateScreen, onEditOrder, activeItem, targetStatus } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheckOrder = useCallback((id) => {
    api.checkOrder(id, targetStatus).then(onUpdateScreen)
  }, [targetStatus])

  const onRejectOrder = useCallback((id) => {
    api.checkOrder(id, "FAILURE_DELIVERY").then(onUpdateScreen)
  }, [1])

  const onDeleteOrder = useCallback((id) => {
    api.checkOrder(id, "CANCEL").then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>Mã đơn hàng</Header>
          <Header>Tên khách hàng</Header>
          <Header textAlign="center">Tổng thanh toán</Header>
          <Header textAlign="center">Ngày nhận hàng</Header>
          <Header textAlign="center">Ngày hoàn tất đơn hàng</Header>
          <Header textAlign="center" width={180}>
            Ngày cập nhật
          </Header>
          <Header textAlign="center" width={100}>
            Trạng thái Thanh toán
          </Header>
          <Header textAlign="center" width={100}>
            Hành động
          </Header>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, (item, index) => (
          <CartRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheckOrder={onCheckOrder}
            onRejectOrder={onRejectOrder}
            onEditOrder={onEditOrder}
            onDeleteOrder={onDeleteOrder}
            onUpdateScreen={onUpdateScreen}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default CartTable;
