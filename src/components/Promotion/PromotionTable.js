import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import PromotionRow from "./PromotionRow";
import Loading from "../Loading";
import api from "../../api"

function ProductTable(props) {

  const { data, isLoading, onUpdateScreen, onEditProduct, activeItem } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheckProduct = useCallback((id) => {
    api.checkPromotion(id).then(onUpdateScreen)
  }, [1])

  const onRejectProduct = useCallback((id) => {
    api.rejectPromotion(id).then(onUpdateScreen)
  }, [1])

  const onDeleteProduct = useCallback((id) => {
    api.deletePromotion(id).then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>Mã khuyến mại</Header>
          <Header>Loại khuyến mại</Header>
          <Header textAlign="center" width={180}>
            Ngày bắt đầu
          </Header>
          <Header textAlign="center" width={180}>
            Ngày kết thúc
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
          <PromotionRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheckProduct={onCheckProduct}
            onRejectProduct={onRejectProduct}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
            checkedStatus={item.checkedStatus}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default ProductTable;
