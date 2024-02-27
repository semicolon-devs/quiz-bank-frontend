"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";

import SectionTitle from "@/components/sectionTitle";
import { getAccess } from "@/helpers/token";

export default function ProfilePage() {
  const [items, setItems] = useState([0, 1, 2, 3]);

  console.log(items);

  return (
    <div>
      <SectionTitle title="Profile" />
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="flex flex-col gap-2"
      >
        {items.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            className="bg-white p-3 w-10 flex items-center justify-center"
          >
            {item}
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
