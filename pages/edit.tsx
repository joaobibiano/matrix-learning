import { FaPlus, FaSave, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";
import { ILearning } from "../types/ILearning";
import { useLearnings } from "../hooks/useLearnigs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Edit = () => {
  const { learnings, addLearning, removeLearning, updateAll } = useLearnings();
  const [input, setInput] = useState("");
  const router = useRouter();

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      learnings,
      result.source.index,
      result.destination.index
    );
    updateAll(quotes);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col items-center pt-8 bg-gray-200 min-h-screen">
        <div className="text-3xl font-bold text-center pb-5 text-gray-700">
          Register the things you want to learn here!
        </div>

        <form
          className="flex md:w-1/2 w-2/3"
          onSubmit={(event) => {
            event.preventDefault();

            addLearning({
              name: input,
              level: 0,
              id: Date.now(),
            });
            setInput("");
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            name="name"
            required
            className="bg-gray-100 cursor-text text-lg p-2 w-full rounded shadow"
          />
          <button
            type="submit"
            className="flex flex-col items-center border border-gray-300 rounded ml-1 shadow"
          >
            <FaPlus className="text-green-500 text-3xl m-2" />
          </button>
        </form>

        <Droppable droppableId="list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col pt-4 md:w-1/2 w-2/3"
            >
              {provided.placeholder}

              {learnings.map((learning, index) => {
                return (
                  <Draggable
                    draggableId={learning.id.toString()}
                    index={index}
                    key={learning.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex w-full mb-3 "
                      >
                        <div className="p-4 flex justify-between items-center bg-white shadow rounded-lg cursor-move w-full">
                          <p>{learning.name}</p>
                        </div>
                        <button
                          type="submit"
                          className="border border-gray-300 rounded ml-1 shadow"
                          onClick={() => {
                            removeLearning(learning);
                          }}
                        >
                          <FaTrash className="text-red-600 text-2xl m-2" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>

        {learnings.length > 0 && (
          <button
            className="flex items-center bg-green-500 text-white rounded-lg px-3 p-2"
            onClick={() => {
              router.push("/");
            }}
          >
            <span>Done</span>
            <FaSave className="text-3xl ml-3" />
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

export default Edit;
