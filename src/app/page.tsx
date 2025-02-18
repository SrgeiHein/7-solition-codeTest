"use client";

import { useState, useRef } from "react";
import data from "./data.json";

type Item = {
  type: "Fruit" | "Vegetable";
  name: string;
};

const Column = ({
  title,
  items,
  className = "",
  onItemClick,
}: {
  title?: string;
  items?: Item[];
  className?: string;
  onItemClick?: (item: Item) => void;
}) => (
  <div className={`flex-1 flex flex-col min-h-[500px] ${className}`}>
    {title && (
      <div className="h-12 bg-gray-100 flex items-center justify-center mb-1">
        <h2 className="text-[16px] font-normal text-black">{title}</h2>
      </div>
    )}
    <div className="flex flex-col">
      {items?.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick?.(item)}
          className="h-12 border border-gray-200 flex items-center justify-center text-[16px] text-black mb-1 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
        >
          {item.name}
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [mainList, setMainList] = useState<Item[]>(data as Item[]);
  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);
  const timersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const moveItemToType = (item: Item) => {
    // Remove from main list
    setMainList((prev) => prev.filter((i) => i.name !== item.name));

    // Add to respective type list
    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    // Clear any existing timer for this item
    if (timersRef.current[item.name]) {
      clearTimeout(timersRef.current[item.name]);
    }

    // Set new timer to move back
    timersRef.current[item.name] = setTimeout(() => {
      if (item.type === "Fruit") {
        setFruitList((prev) => prev.filter((i) => i.name !== item.name));
      } else {
        setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
      }
      setMainList((prev) => [...prev, item]);
      delete timersRef.current[item.name];
    }, 5000);
  };

  const moveBackToMain = (item: Item) => {
    // Clear the timer if it exists
    if (timersRef.current[item.name]) {
      clearTimeout(timersRef.current[item.name]);
      delete timersRef.current[item.name];
    }

    // Remove from type list
    if (item.type === "Fruit") {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }
    // Add to main list
    setMainList((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4">
      <div className="w-[1000px] flex gap-1">
        <Column items={mainList} onItemClick={moveItemToType} />
        <Column
          title="Fruit"
          items={fruitList}
          className="ml-1 border border-gray-200"
          onItemClick={moveBackToMain}
        />
        <Column
          title="Vegetable"
          items={vegetableList}
          className="ml-1 border border-gray-200"
          onItemClick={moveBackToMain}
        />
      </div>
    </div>
  );
}
