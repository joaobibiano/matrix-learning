import Link from "next/link";
import React from "react";
import { useLearnings } from "../hooks/useLearnigs";

const MAX_LEVEL = 10;
export default function Home() {
  const { learnings, updateAll } = useLearnings();

  const onChange = (id: number, index: number) => {
    const newLearnings = learnings.map((item) => {
      if (item.id === id) {
        return { ...item, level: index + 1 };
      }
      return item;
    });

    updateAll(newLearnings);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex justify-around items-center border-b border-gray-500">
        <h1 className="text-5xl font-bold text-center py-5 text-gray-800 uppercase">
          Learning matrix
        </h1>
      </div>
      {learnings.length === 0 && (
        <div className="w-screen text-center p-4">
          <Link href="/edit">
            <a className="text-2xl underline text-blue-700">
              Start adding learnings here!
            </a>
          </Link>
        </div>
      )}
      <div className="flex flex-col text-center">
        {learnings.map((learning) => (
          <div
            className="w-full border-r border-b border-gray-500 p-5"
            key={learning.id}
          >
            <h1 className="text-4xl font-bold text-center pb-5 text-gray-700">
              {learning.name}
            </h1>

            <div className="flex flex-wrap justify-center">
              {new Array(MAX_LEVEL).fill(0).map((_, i) => (
                <button
                  onClick={() => onChange(learning.id, i)}
                  key={i}
                  className={`w-8 h-8 m-2 ${
                    i < learning.level ? "bg-gray-700" : "bg-gray-400"
                  } rounded-full`}
                ></button>
              ))}
            </div>
          </div>
        ))}
        {learnings.length > 0 && (
          <Link href="/edit">
            <a className="text-gray-800 py-5 text-2xl">Edit</a>
          </Link>
        )}
      </div>
    </div>
  );
}
