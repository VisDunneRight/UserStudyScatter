import { Col, Button, Form, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { MyRow, TopImage, ImgRow, QRow } from "./style";

const Radio = ({
  page,
  data,
  order,
  saveAnswer,
  nextQuestion,
  questionIndex,
}) => {
  const [answer, setAnswer] = useState(-1);

  function handleNextQuestion(event) {
    event.preventDefault();
    if (answer === -1) {
      alert("Please select an option before hitting next.");
      return;
    }
    const currQ = data[order[questionIndex]];
    const answerName =
      currQ["chartId"] +
      "_" +
      currQ["algorithm"] +
      "_" +
      currQ["questionType"] +
      "_" +
      currQ["Privacy"] +
      "_" +
      currQ["Bin"];
    saveAnswer(answerName, answer).then(function (response) {
      setAnswer(-1);
      nextQuestion(questionIndex + 1);
    });
  }

  function onChange(value) {
    setAnswer(value);
  }

  const typeRendering = (data) => {
    switch (data.questionType) {
      case "clusters":
        return (
          <h4>
            The distribution of points in space for the graph on the right is
            comparable the graphs on the left, including the visibility of
            manifolds and the relative density of each region.
          </h4>
        );
      case "correlation":
        return (
          <h4>
            The graph on the right preserves the level of dependence between the
            two attributes—including non-linear dependence.
          </h4>
        );
      case "distribution":
        return (
          <h4>
            The clusters visible in the graph on the left—and no other
            clusters—are visible on the graph on the right and occur in the same
            places.
          </h4>
        );
      default:
        throw new Error("Missing type of testing Section.");
    }
  };
  var currQuestion = data[order[questionIndex]];
  var folderLoc =
    process.env.PUBLIC_URL + "/Chart" + currQuestion["chartId"] + "/";

  return (
    <>
      <MyRow>{typeRendering(currQuestion)}</MyRow>

      <ImgRow>
        <Col>
          <TopImage
            src={folderLoc + currQuestion["scatteredImg"]}
            width="400px"
          />
          <Image src={folderLoc + currQuestion["binnedImg"]} width="400px" />
        </Col>
        <Col>
          <Image src={folderLoc + currQuestion["algorithmImg"]} width="400px" />
        </Col>
      </ImgRow>
      <MyRow>
        <br />
      </MyRow>
      <QRow>
        <Form>
          <Form.Check
            type="radio"
            onClick={(e) => onChange(0)}
            checked={answer === 0 ? true : false}
            id={`option-0`}
            label={`Doesn’t preserve the feature`}
          />
          <Form.Check
            type="radio"
            onClick={(e) => onChange(1)}
            checked={answer === 1 ? true : false}
            id={`option-1`}
            label={`Suggests the feature could exist`}
          />
          <Form.Check
            type="radio"
            onClick={(e) => onChange(2)}
            checked={answer === 2 ? true : false}
            id={`option-2`}
            label={`Somewhat preserves the feature`}
          />
          <Form.Check
            type="radio"
            onClick={(e) => onChange(3)}
            checked={answer === 3 ? true : false}
            id={`option-3`}
            label={`Preserves the feature very well`}
          />
        </Form>
      </QRow>
      <MyRow>
        <Col>
          <Button variant="secondary" onClick={handleNextQuestion}>
            Prev
          </Button>{" "}
        </Col>
        <Col>
          <Button variant="secondary" onClick={handleNextQuestion}>
            Next
          </Button>{" "}
        </Col>
      </MyRow>
    </>
  );
};

export default Radio;
