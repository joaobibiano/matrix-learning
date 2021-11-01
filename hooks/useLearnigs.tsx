import { useEffect, useState } from "react";
import { ILearning } from "../types/ILearning";

const KEY = "learnings";

function writeLocalStorage(data: ILearning[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function readLocalStorage() {
  const data = localStorage.getItem(KEY);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

export const useLearnings = () => {
  const [learnings, setLearnings] = useState<ILearning[]>([]);

  useEffect(() => {
    const data = readLocalStorage();
    setLearnings(data);
  }, []);

  const addLearning = (learning: ILearning) => {
    const newLearnings = [...learnings, learning];
    setLearnings(newLearnings);
    writeLocalStorage(newLearnings);
  };

  const removeLearning = (learning: ILearning) => {
    const newLearnings = learnings.filter((l) => l.id !== learning.id);
    setLearnings(newLearnings);
    writeLocalStorage(newLearnings);
  };

  const updateAll = (learnings: ILearning[]) => {
    setLearnings(learnings);
    writeLocalStorage(learnings);
  };

  return { learnings, addLearning, removeLearning, updateAll };
};
