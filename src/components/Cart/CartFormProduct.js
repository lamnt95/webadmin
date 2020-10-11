import _ from "lodash"
import React from "react"
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import utils from "../../utils"

export default function CartFormProduct(props) {
  const { data, productsKeyBy } = props;
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
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {_.map(data, item => <Table.Row key={item.code}>
        <Table.Cell>{_.get(productsKeyBy, [item.productId, "code"])}</Table.Cell>
        <Table.Cell>{_.get(productsKeyBy, [item.productId, "name"])}</Table.Cell>
        <Table.Cell>{utils.formatMoney(item.productQuantity)}</Table.Cell>
        <Table.Cell>{utils.formatMoney(_.get(productsKeyBy, [item.productId, "price"]))}</Table.Cell>
        <Table.Cell>{utils.formatMoney(_.get(productsKeyBy, [item.productId, "priceAfterPromotion"]))}</Table.Cell>
        <Table.Cell>{utils.formatMoney(_.get(productsKeyBy, [item.productId, "totalCost"]) || (item.productQuantity * _.get(productsKeyBy, [item.productId, "price"])))}</Table.Cell>
        <Table.Cell>{utils.formatMoney(_.get(productsKeyBy, [item.productId, "totalCostAfterPromotion"]) || (item.productQuantity * _.get(productsKeyBy, [item.productId, "priceAfterPromotion"])))}</Table.Cell>
        <Table.Cell>{utils.formatMoney((_.get(productsKeyBy, [item.productId, "totalCost"]) - _.get(productsKeyBy, [item.productId, "totalCostAfterPromotion"]))
          || (item.productQuantity * _.get(productsKeyBy, [item.productId, "price"]) - item.productQuantity * _.get(productsKeyBy, [item.productId, "priceAfterPromotion"])))}</Table.Cell>
      </Table.Row>)}
    </Table.Body>
  </Table>
}