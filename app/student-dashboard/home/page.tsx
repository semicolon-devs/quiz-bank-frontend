"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

import { title, subtitle } from "@/components/primitives";
import { RightArrowIcon } from "@/components/icons";

export default async function DashboardHomePage() {
  const rows = [
    {
      key: "1",
      quiz_no: "45756",
      quiz_name: "Bio Chemistry quiz",
      score: "-",
      questions_completed: "10/12",
      status: "in progress",
    },
    {
      key: "2",
      quiz_no: "35687",
      quiz_name: "Calculus quiz",
      score: "75/100",
      questions_completed: "12/12",
      status: "completed",
    },
    {
      key: "3",
      quiz_no: "23456",
      quiz_name: "Genetics quiz",
      score: "99/100",
      questions_completed: "12/12",
      status: "completed",
    },
    {
      key: "4",
      quiz_no: "45756",
      quiz_name: "Bio Chemistry quiz",
      score: "-",
      questions_completed: "10/12",
      status: "in progress",
    },
    {
      key: "5",
      quiz_no: "35687",
      quiz_name: "Calculus quiz",
      score: "75/100",
      questions_completed: "12/12",
      status: "completed",
    },
    {
      key: "6",
      quiz_no: "23456",
      quiz_name: "Genetics quiz",
      score: "99/100",
      questions_completed: "12/12",
      status: "completed",
    },
  ];

  const columns = [
    {
      key: "quiz_no",
      label: "QUIZ NO",
    },
    {
      key: "quiz_name",
      label: "QUIZ NAME",
    },
    {
      key: "score",
      label: "SCORE",
    },
    {
      key: "questions_completed",
      label: "QUESTIONS COMPLETED",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <div>
      <h1 className={title({ size: "md" })}>Student Dashboard</h1>
      <h1 className={subtitle()}>Question Packs</h1>
      <div className="mb-6 flex gap-3">
        <Card className="w-[250px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Module Quiz</p>
              <p className="text-small text-default-500">Quiz #45252</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg font-semibold">Bio Chemistry Quiz</p>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter className="flex justify-end">
            <Chip
              endContent={<RightArrowIcon classes="w-3 h-3" />}
              variant="solid"
              color="primary"
              size="lg"
            >
              <Link
                isExternal
                href="https://github.com/nextui-org/nextui"
                className="uppercase text-white text-sm"
              >
                details
              </Link>
            </Chip>
          </CardFooter>
        </Card>
        <Card className="w-[250px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Module Quiz</p>
              <p className="text-small text-default-500">Quiz #45252</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg font-semibold">Psychology Quiz</p>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter className="flex justify-end">
            <Chip
              endContent={<RightArrowIcon classes="w-3 h-3" />}
              variant="solid"
              color="primary"
              size="lg"
            >
              <Link
                isExternal
                href="https://github.com/nextui-org/nextui"
                className="uppercase text-white text-sm"
              >
                details
              </Link>
            </Chip>
          </CardFooter>
        </Card>
        <Card className="w-[250px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Module Quiz</p>
              <p className="text-small text-default-500">Quiz #45252</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg font-semibold">Human Anatomy Quiz</p>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter className="flex justify-end">
            <Chip
              endContent={<RightArrowIcon classes="w-3 h-3" />}
              variant="solid"
              color="primary"
              size="lg"
            >
              <Link
                isExternal
                href="https://github.com/nextui-org/nextui"
                className="uppercase text-white text-sm"
              >
                details
              </Link>
            </Chip>
          </CardFooter>
        </Card>
        <Card className="w-[250px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">Module Quiz</p>
              <p className="text-small text-default-500">Quiz #45252</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-lg font-semibold">Human Anatomy Quiz</p>
          </CardBody>
          {/* <Divider /> */}
          <CardFooter className="flex justify-end">
            <Chip
              endContent={<RightArrowIcon classes="w-3 h-3" />}
              variant="solid"
              color="primary"
              size="lg"
            >
              <Link
                isExternal
                href="https://github.com/nextui-org/nextui"
                className="uppercase text-white text-sm"
              >
                details
              </Link>
            </Chip>
          </CardFooter>
        </Card>
      </div>
      <h1 className={subtitle()}>Stats</h1>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">quizes completed</p>
                <p className="font-bold uppercase">14</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">quizes in progress</p>
                <p className="font-bold uppercase">2</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">average score</p>
                <p className="font-bold uppercase">89/100</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">aggregated points</p>
                <p className="font-bold uppercase">1450</p>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-2">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
