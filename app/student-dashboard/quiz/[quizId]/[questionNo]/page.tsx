"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { getUserID } from "@/helpers/userDetails";

interface Question {
  answers: { number: number; answer: string; _id: string }[];
  question: string;
  type: string;
  __v: number;
}

export default async function QuizQuestionPage({
  params,
}: {
  params: { questionNo: string; quizId: string };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [answersSelected, setAnswersSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const getQuestion = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.quizId}/${params.questionNo}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestion(response.data.question);
          setSubmittedAnswers(response.data.answer.answer);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQuestion();
  }, []);

  function setSubmittedAnswers(submittedAnswers: number[]) {
    for (let i = 0; i < answersSelected.length; i++) {
      if (submittedAnswers.includes(i)) {
        setAnswersSelected((prev) => {
          const newArray = [...prev];
          newArray[i] = true;
          return newArray;
        });
      }
    }
  }

  function getTrueIndexes(): number[] {
    let trueIndexes = [];
    for (let i = 0; i < answersSelected.length; i++) {
      if (answersSelected[i] === true) {
        trueIndexes.push(i);
      }
    }
    return trueIndexes;
  }

  const handleSubmit = () => {
    console.log(getTrueIndexes());
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}answers/submit`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        userId: getUserID(),
        paperId: params.quizId,
        questionIndex: params.questionNo,
        answer: getTrueIndexes(),
        submitAt: "2023-02-02",
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCompleteQuiz = () => {
    handleSubmit();
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}answers/finish`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        userId: getUserID(),
        paperId: params.quizId,
        submitAt: "2023-02-02",
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        window.location.href = `/student-dashboard/quiz/review/${params.quizId}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 flex-grow">
      {loading ? (
        <Spinner label="Loading ..." color="primary" labelColor="primary" />
      ) : (
        <>
          <div className="overflow-auto h-96 gap-3 flex flex-col">
            <div className="w-full flex justify-between items-center">
              {question && (
                <p
                  dangerouslySetInnerHTML={{ __html: question.question }}
                  className="font-semibold"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              {question &&
                question?.answers.length > 0 &&
                question.answers.map((answer, index) => (
                  <div className="flex gap-5" key={answer._id}>
                    <Checkbox
                      isSelected={answersSelected[index]}
                      onValueChange={() =>
                        setAnswersSelected((prev) => {
                          let newArray = [...prev];
                          newArray[index] = !newArray[index];
                          return newArray;
                        })
                      }
                    ></Checkbox>
                    <div
                      className="bg-white p-3 rounded-xl w-full"
                      dangerouslySetInnerHTML={{ __html: answer.answer }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            <Button color="primary" onClick={handleSubmit}>
              Submit Answer
            </Button>
            <Button color="secondary" onClick={handleCompleteQuiz}>
              Complete Quiz
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
