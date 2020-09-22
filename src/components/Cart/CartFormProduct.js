import _ from "lodash"
import React from "react"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

export default function CartFormProduct(props) {
  const { data, onRemove } = props;
  if (_.isEmpty(data)) return null;
  return <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Mã sản phẩm</Table.HeaderCell>
        <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
        <Table.HeaderCell>Số lượng</Table.HeaderCell>
        <Table.HeaderCell>Thao tác</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {_.map(data, item => <Table.Row key={item.productId}>
        <Table.Cell>{item.productId}</Table.Cell>
        <Table.Cell>{item.productName}</Table.Cell>
        <Table.Cell>{item.productQuantity}</Table.Cell>
        <Table.Cell>
          <button onClick={() => onRemove(item.productId)}>
            Xoá
          </button>
        </Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table>
}