import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import PostTableRow from "./PostTableRow";
import Loading from "../Loading";
import api from "../../api"

function PostTable(props) {

  const { data, isLoading, onUpdateScreen, onEdit,activeItem } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheck = useCallback((id) => {
    api.checkPost(id).then(onUpdateScreen)
  }, [1])

  const onReject = useCallback((id) => {
    api.rejectPost(id).then(onUpdateScreen)
  }, [1])

  const onDelete = useCallback((id) => {
    api.deletePost(id).then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>ID</Header>
          <Header>Tên</Header>
          <Header>Lượt xem</Header>
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
          <PostTableRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheck={onCheck}
            onReject={onReject}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default PostTable;
