import React from "react";
import Demographics from "./Demographic/Demographic";
import Information from "./Information/Information";
import Break from "./Break/Break";
import Section from "./Section/Section";
import Radio from "./Radio/Radio";

const Option = ({
  page,
  data,
  order,
  grabInformation,
  saveAnswer,
  questionIndex,
  exportStudy,
  prevQuestion,
  nextQuestion,
  answers,
  nextPage,
  results,
}) => {
  if (page.type === "Demographic") {
    return (
      <Demographics
        page={page}
        grabInformation={grabInformation}
        nextPage={nextPage}
      />
    );
  } else if (page.type === "Information") {
    return (
      <Information
        page={page}
        nextPage={nextPage}
        exportStudy={exportStudy}
        results={results}
      />
    );
  } else if (page.type === "Section") {
    return (
      <Section
        page={page}
        data={data[page.position]}
        saveAnswer={saveAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
      />
    );
  } else if (page.type === "Radio") {
    return (
      <Radio
        page={page}
        data={data[page.position]}
        order={order}
        saveAnswer={saveAnswer}
        questionIndex={questionIndex}
        prevQuestion={prevQuestion}
        nextQuestion={nextQuestion}
        prevAnswer={answers[questionIndex]}
      />
    );
  } else if (page.type === "Break") {
    return <Break page={page} nextPage={nextPage} />;
  } else {
    console.log("Page missing", page.type);
    return <></>;
  }
};

const Pages = ({
  siteStructure,
  data,
  order,
  grabInformation,
  currPage,
  saveAnswer,
  nextPage,
  exportStudy,
  prevQuestion,
  nextQuestion,
  answers,
  questionIndex,
  results,
}) => {
  return (
    <>
      {siteStructure.pages && (
        <Option
          key={currPage}
          page={siteStructure.pages[currPage]}
          data={data}
          order={order}
          grabInformation={grabInformation}
          saveAnswer={saveAnswer}
          exportStudy={exportStudy}
          nextPage={nextPage}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          answers={answers}
          questionIndex={questionIndex}
          results={results}
        />
      )}
    </>
  );
};

export default Pages;
