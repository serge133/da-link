import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd";
import { useEffect, useMemo, useState } from "react";
import produce from "immer";
import TaskboardItemFormModal, {
  TaskboardItemFormValues,
} from "./TaskboardItemFormModal";
import TaskboardCol, { TaskboardColProps } from "./TaskboardCol";
import useAuth from "../../Contexts/useAuth";
import { onValue, ref, update } from "firebase/database";
import database from "../../database/firebase";

const generateId = () => Date.now().toString();

export type TaskType = {
  id: string;
  author: string;
  title: string;
  description: string;
};

type TaskboardType = {
  "To Do": TaskType[];
  "In Progress": TaskType[];
  Done: TaskType[];
};

type Props = {
  crn: string;
  studygroupID: string;
};

function Taskboard(props: Props) {
  const defaultItems = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };
  const [itemsByStatus, setItemsByStatus] =
    useState<TaskboardType>(defaultItems);

  const { user } = useAuth();

  const handleDragEnd: DragDropContextProps["onDragEnd"] = ({
    source,
    destination,
  }) => {
    setItemsByStatus((current) => {
      const newOrder = produce(current, (draft) => {
        // dropped outside the list
        if (!destination) {
          return;
        }
        const [removed] = draft[source.droppableId].splice(source.index, 1);
        draft[destination.droppableId].splice(destination.index, 0, removed);
      });

      const taskboardRef = ref(
        database,
        `/studygroups/${props.crn}/${props.studygroupID}/taskboard`
      );

      update(taskboardRef, newOrder);

      return newOrder;
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [itemToEdit, setItemToEdit] = useState<TaskType | null>(null);

  const openTaskItemModal = (itemToEdit: TaskType | null) => {
    setItemToEdit(itemToEdit);
    setIsModalVisible(true);
  };

  const closeTaskItemModal = () => {
    setItemToEdit(null);
    setIsModalVisible(false);
  };

  const handleDelete: TaskboardColProps["onDelete"] = ({
    status,
    itemToDelete,
  }) =>
    setItemsByStatus((current) =>
      produce(current, (draft) => {
        draft[status] = draft[status].filter(
          (item) => item.id !== itemToDelete.id
        );
      })
    );

  const initialValues = useMemo<TaskboardItemFormValues>(
    () => ({
      title: itemToEdit?.title ?? "",
      description: itemToEdit?.description ?? "",
    }),
    [itemToEdit]
  );

  useEffect(() => {
    const taskboardRef = ref(
      database,
      `/studygroups/${props.crn}/${props.studygroupID}/taskboard`
    );

    onValue(taskboardRef, (snapshot) => {
      const data = snapshot.val();
      let taskboardVal: TaskboardType = defaultItems;
      if (data) {
        if ("To Do" in data) {
          taskboardVal["To Do"] = Object.values(data["To Do"]);
        }
        if ("In Progress" in data) {
          taskboardVal["In Progress"] = Object.values(data["In Progress"]);
        }
        if ("Done" in data) {
          taskboardVal["Done"] = Object.values(data["Done"]);
        }
        setItemsByStatus(taskboardVal);
      }
    });
  }, [user]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="taskboard-root">
          <div className="taskboard-content">
            <TaskboardCol
              status="To Do"
              items={itemsByStatus["To Do"]}
              onClickAdd={() => openTaskItemModal(null)}
              onEdit={openTaskItemModal}
              onDelete={handleDelete}
            />
            <TaskboardCol
              status="In Progress"
              items={itemsByStatus["In Progress"]}
              onClickAdd={undefined}
              onEdit={openTaskItemModal}
              onDelete={handleDelete}
            />
            <TaskboardCol
              status="Done"
              items={itemsByStatus["Done"]}
              onClickAdd={undefined}
              onEdit={openTaskItemModal}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </DragDropContext>
      <TaskboardItemFormModal
        visible={isModalVisible}
        onCancel={closeTaskItemModal}
        onOk={(values) => {
          setItemsByStatus((current) => {
            const newItem = produce(current, (draft) => {
              if (itemToEdit) {
                // Editing existing item
                const draftItem = Object.values(draft)
                  .flatMap((items) => items)
                  .find((item) => item.id === itemToEdit.id);
                if (draftItem) {
                  draftItem.title = values.title;
                  draftItem.description = values.description;
                }
              } else {
                // Adding new item as "to do"
                draft["To Do"].push({
                  ...values,
                  author: user.uid,
                  id: generateId(),
                });
              }
            });
            const taskboardRef = ref(
              database,
              `/studygroups/${props.crn}/${props.studygroupID}/taskboard`
            );

            update(taskboardRef, newItem);

            return newItem;
          });
        }}
        initialValues={initialValues}
      />
    </>
  );
}

export default Taskboard;
