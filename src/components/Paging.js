import _ from "lodash";
import { Table, Menu, Icon } from "semantic-ui-react";

function Paging(props) {
  const { onBack, onNext, total, current, onClickPaging } = props || {};
  if (total == 0 || !total) return null;

  const backIndex = current - 1;
  const nextIndex = current + 1;
  const pagingList = _.fill(Array(total), 0);
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="5">
          <Menu floated="right" pagination>
            <Menu.Item
              as="a"
              icon
              onClick={() => onBack(backIndex)}
              disabled={current === 0}
            >
              <Icon name="chevron left" />
            </Menu.Item>
            {_.map(pagingList, (item, index) => (
              <Menu.Item
                as="a"
                onClick={() => onClickPaging(index)}
                active={current === index}
              >
                {index + 1}
              </Menu.Item>
            ))}
            <Menu.Item
              as="a"
              icon
              onClick={() => onNext(nextIndex)}
              disabled={current === total - 1}
            >
              <Icon name="chevron right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
}

export default Paging;
