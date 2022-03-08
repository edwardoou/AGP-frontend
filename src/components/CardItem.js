import React from "react";
/* import Image from "next/dist/client/image";
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from "@heroicons/react/outline"; */
import { Draggable } from "react-beautiful-dnd";

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="draggableCard"
        >
          <label
            className={`labelCard
              ${
                data.priority === 0
                  ? "from-blue-600 to-blue-400"
                  : data.priority === 1
                  ? "from-green-600 to-green-400"
                  : "from-red-600 to-red-400"
              }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label>
          <h5 className="h5Card">{data.title}</h5>
          <div className="divCard">
            <div className="divCard2">
              <span className="spanCard">
                {/* <ChatAlt2Icon className="w-4 h-4 text-gray-500" /> */}
                <span>{data.chat}</span>
              </span>
              <span className="spanCard">
                {/* <PaperClipIcon className="w-4 h-4 text-gray-500" /> */}
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="ulkanban">
              {data.assignees.map((ass, index) => {
                return (
                  <li key={index}>
                    {/* <image
                      src={ass.avt}
                      width="36"
                      height="36"
                      objectFit="cover"
                      className=" rounded-full "
                    /> */}
                  </li>
                );
              })}
              <li>
                <button
                  className="button1"
                >
                  {/* <PlusIcon className="w-5 h-5 text-gray-500" /> */}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default CardItem;
