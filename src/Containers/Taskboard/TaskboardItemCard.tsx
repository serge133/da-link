import { Button, Card, Modal, Typography, Dropdown, Menu } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { red } from "@ant-design/colors";
import styled from "styled-components";
import BaseTooltip from "../../Components/BaseTooltip";
import { TaskType } from "./Taskboard";

interface StyledCardProps {
  $isDragging: boolean;
}

const StyledCard = styled(Card)<StyledCardProps>`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ $isDragging }) => ($isDragging ? "#fafafa" : "#fff")};
`;

const TaskboardItemCardTitle = styled(Typography.Title)`
  white-space: pre-wrap;
  // To make ellipsis of the title visible.
  // Without this margin, it can be go behind the "extra" component.
  // So, we give it a little space.
  margin-right: 0.25rem;
`;

const DeleteMenuItem = styled(Menu.Item)`
  color: ${red.primary};
`;

export interface TaskboardItemCardProps {
  item: TaskType;
  isDragging: boolean;
  status: "To Do" | "Done" | "In Progress";
  onEdit: (itemToEdit: TaskType) => void;
  onDelete: (args: {
    status: "To Do" | "Done" | "In Progress";
    itemToDelete: TaskType;
  }) => void;
}

function TaskboardItemCard({
  item,
  status,
  isDragging,
  onEdit,
  onDelete,
}: TaskboardItemCardProps) {
  const items = [
    { label: <a onClick={() => onEdit(item)}>Edit</a>, key: "Edit" },
    {
      label: (
        <a
          onClick={() =>
            Modal.confirm({
              title: "Delete?",
              content: `Are you sure to delete "${item.title}"?`,
              onOk: () =>
                onDelete({
                  status,
                  itemToDelete: item,
                }),
            })
          }
        >
          Delete
        </a>
      ),
      key: "Delete",
    },
  ];

  return (
    <StyledCard
      $isDragging={isDragging}
      size="small"
      title={
        <BaseTooltip overlay={item.title}>
          {/* styled(Typography.Title) throws an error in console about 
          forwarding ref in function components.
          Because Typography.Title doesn't accept a ref.
          So, we just placed a span tag here. */}
          <span>
            <TaskboardItemCardTitle level={5} ellipsis={{ rows: 2 }}>
              {item.title}
            </TaskboardItemCardTitle>
          </span>
        </BaseTooltip>
      }
      extra={
        <Dropdown
          menu={{ items }}
          // overlay={
          //   <Menu>
          //     <Menu.Item icon={<EditOutlined />} onClick={() => onEdit(item)}>
          //       Edit
          //     </Menu.Item>
          //     <DeleteMenuItem
          //       icon={<DeleteOutlined />}
          //       onClick={() =>
          //         Modal.confirm({
          //           title: "Delete?",
          //           content: `Are you sure to delete "${item.title}"?`,
          //           onOk: () =>
          //             onDelete({
          //               status,
          //               itemToDelete: item,
          //             }),
          //         })
          //       }
          //     >
          //       Delete
          //     </DeleteMenuItem>
          //   </Menu>
          // }
          // trigger={["click"]}
        >
          <Button size="small" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <BaseTooltip overlay={item.description}>
        <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {item.description}
        </Typography.Paragraph>
      </BaseTooltip>
    </StyledCard>
  );
}

export default TaskboardItemCard;
