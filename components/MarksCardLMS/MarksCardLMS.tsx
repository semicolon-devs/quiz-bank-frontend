import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  marks: UserMark[] | undefined; 
};

interface UserMark {
  _id: string;
  paperId : {
    _id:string;
    title:string;
  }
  userId: string;
  reading: number;
  logicalAndProblemSolving: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didNotAnswer: number;
  wrongAnswer: number;
  corrcetAnswer: number;
  lostmarks: number;
  total: number;
  __v: number;
}

const MarksCardLMS = ({ marks }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-3">
    {marks?.slice().reverse().map((mark: UserMark, index: number) => (
      <Accordion key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index + 1}-content`}
          id={`panel${index + 1}-header`}
        >
          <div className="font-bold flex flex-col p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            {mark && mark.paperId && mark.paperId.title}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <table className="text-left w-full border-collapse rounded-xl">
            <thead>
              <tr>
                <th className="py-4 px-6 bg-blue-500 font-bold uppercase text-sm text-white border-b border-grey-light">
                  Details
                </th>
                <th className="py-4 px-6 text-center bg-blue-500 font-bold uppercase text-sm text-white border-b border-grey-light">
                  Marks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Reading Skills</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.reading}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Logic and Problem Solving</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.logicalAndProblemSolving}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Biology</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.biology}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Chemistry</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.chemistry}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Physics and Maths</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.physicsAndMaths}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Did not Answer</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.didNotAnswer}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Wrong Answer</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.wrongAnswer}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Correct Answer</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.corrcetAnswer}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Lost Marks</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.lostmarks}</td>
              </tr>
              <tr className="hover:bg-grey-lighter">
                <td className="py-4 px-6 border-b border-grey-light">Total</td>
                <td className="py-4 px-6 text-center border-b border-grey-light">{mark.total}</td>
              </tr>
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
  
  );
};

export default MarksCardLMS;
