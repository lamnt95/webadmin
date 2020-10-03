import _ from "lodash"
import React from "react"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default function CartFormProduct(props) {
  const { data, onRemove } = props;
  console.log("data", data)
  if (_.isEmpty(data)) return null;
  return <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Mã sản phẩm</Table.HeaderCell>
        <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
        <Table.HeaderCell>Số lượng</Table.HeaderCell>
        <Table.HeaderCell>Đơn giá</Table.HeaderCell>
        <Table.HeaderCell>Giá sau chiết khấu</Table.HeaderCell>
        <Table.HeaderCell>Thành tiền</Table.HeaderCell>
        <Table.HeaderCell>Thành tiền sau chiết khấu</Table.HeaderCell>
        <Table.HeaderCell>Chiết khấu</Table.HeaderCell>
        <Table.HeaderCell>Phần trăm chiết khấu</Table.HeaderCell>
        <Table.HeaderCell>Thao tác</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {_.map(data, item => <Table.Row key={item.productId}>
        <Table.Cell>{item.productId}</Table.Cell>
        <Table.Cell>{item.productName}</Table.Cell>
        <Table.Cell>{item.productQuantity}</Table.Cell>
        <Table.Cell>{item.price}</Table.Cell>
        <Table.Cell>{item.priceAfterPromotion}</Table.Cell>
        <Table.Cell>{item.totalCost}</Table.Cell>
        <Table.Cell>{item.totalCostAfterPromotion}</Table.Cell>
        <Table.Cell>{item.totalCost - item.totalCostAfterPromotion}</Table.Cell>
        <Table.Cell>{item.totalRatePromotion}</Table.Cell>
        <Table.Cell>
          <button onClick={() => onRemove(item.productId)}>
            Xoá
          </button>
        </Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table>
}