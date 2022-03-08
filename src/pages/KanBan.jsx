/* import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline"; */
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const KanBanGeneral = () => {
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const onDragEnd = (res) => {
    if (!res.destination) return;
    // data del json
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(res.source.droppableId)].items[res.source.index];
    newBoardData[parseInt(res.source.droppableId)].items.splice(
      res.source.index,
      1
    );
    newBoardData[parseInt(res.destination.droppableId)].items.splice(
      res.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  return (
    <div className="card">
      <div className="div1">
        {/* Board header */}
        <div className="div2">
          <div className="div3">
            <h4 className="studioh4">KanBan General</h4>
          </div>
        </div>

        {/* Board columns */}
        {
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="divboard">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`divboard2
                            ${snapshot.isDraggingOver}`}
                          >
                            <span className="spanboard"></span>
                            <h4 className=" spanh4">
                              <span className="spanname">{board.name}</span>
                            </h4>

                            <div
                              className="divboard3"
                              style={{ maxHeight: "calc(100vh - 290px)" }}
                            >
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      style={{ margin: "0.75rem" }}
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>

                            {showForm && selectedBoard === bIndex ? (
                              <div style={{ padding: "0.75rem" }}>
                                <textarea
                                  className="textarea"
                                  rows={3}
                                  placeholder="Task info"
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}
                                />
                              </div>
                            ) : (
                              <button
                                className="button2"
                                onClick={() => {
                                  setSelectedBoard(bIndex);
                                  setShowForm(true);
                                }}
                              >
                                <span>Add task</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        }
      </div>
    </div>
  );
};

export default KanBanGeneral;
