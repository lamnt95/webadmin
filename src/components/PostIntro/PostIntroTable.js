import _ from "lodash";
import React, { useCallback } from "react";
import { Table } from "semantic-ui-react";
import { WrapperTable, Header } from "../TableStyle";
import PostIntroTableRow from "./PostIntroTableRow";
import Loading from "../Loading";
import api from "../../api"

function PostIntroTable(props) {

  const { data, isLoading, onUpdateScreen, onEdit, activeItem,activeDropdown } = props;


  if (isLoading)
    return (
      <WrapperTable>
        <Loading />
      </WrapperTable>
    );
  if (_.isEmpty(data)) return null;

  const onCheck = useCallback((id) => {
    api.checkPostIntro(id).then(onUpdateScreen)
  }, [1])

  const onReject = useCallback((id) => {
    api.rejectPostIntro(id).then(onUpdateScreen)
  }, [1])

  return (
    <WrapperTable>
      <Table.Header>
        <Table.Row>
          <Header>ID</Header>
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
          <PostIntroTableRow index={index + 1} key={item.id} data={item}
            isActive={activeItem === item.id}
            onCheck={onCheck}
            onReject={onReject}
            onEdit={onEdit}
            activeDropdown={activeDropdown}
          />
        ))}
      </Table.Body>
    </WrapperTable>
  );
}

export default PostIntroTable;
