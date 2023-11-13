"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";

import { title } from "@/components/primitives";

const courses = [
  {
    id: 1,
    subject: "Biology",
    subject_category: [
      { id: 1, category: "Anatomy" },
      { id: 2, category: "Physiology" },
      { id: 3, category: "Epidomology" },
    ],
  },
  {
    id: 2,
    subject: "Chemistry",
    subject_category: [
      { id: 1, category: "Organic Chemistry" },
      { id: 2, category: "Inorganic Chemistry" },
      { id: 3, category: "Physical Chemistry" },
    ],
  },
  {
    id: 3,
    subject: "Mathematics",
    subject_category: [
      { id: 1, category: "Calculus" },
      { id: 2, category: "Group Theory" },
      { id: 3, category: "Linear Programming" },
    ],
  },
];

export default function ManageUsersPage() {
  return (
    <div>
      <h1 className={title({ size: "md" })}>Manage Courses</h1>
      <Accordion selectionMode="multiple" variant="splitted" className="mt-5">
        {courses &&
          courses.map((item) => (
            <AccordionItem
              key={item.id}
              aria-label={item.subject}
              title={item.subject}
            >
              {item.subject_category.map((category) => (
                <div className="" key={category.id}>
                  {category.category}
                </div>
              ))}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
