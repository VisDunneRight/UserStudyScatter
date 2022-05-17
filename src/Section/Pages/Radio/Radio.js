import { Col, Button, Form, Image, Input } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MyRow, TopImage, ImgRow, QRow } from "./style";

const Radio = ({
  page,
  data,
  order,
  saveAnswer,
  prevQuestion,
  prevAnswer,
  nextQuestion,
  questionIndex,
}) => {
  const [answer, setAnswer] = useState(prevAnswer ? prevAnswer[1] : -1);

  useEffect(() => {
    if (prevAnswer === undefined) {
      setAnswer(-1);
    } else {
      setAnswer(prevAnswer[1]);
    }
  }, [prevAnswer]);
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
  function onkeyPress(event) {
    console.log(event);
    if (event.charCode === 49) {
      this.onChange(0);
    } else if (event.charCode === 50) {
      this.onChange(1);
    } else if (event.charCode === 51) {
      this.onChange(2);
    } else if (event.charCode === 52) {
      this.onChange(3);
    } else if (event.charCode === 13 || event.charCode === 32) {
      this.handleNextQuestion();
    }
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
          <Button variant="secondary" onClick={prevQuestion}>
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
