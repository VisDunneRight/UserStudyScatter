import React from "react";
import studyData from "../Data/studyData.json";
import studyMeta from "../Data/studyMeta.json";
import Pages from "./Pages/Pages";
import { MyContainer, MyDiv, MyProgressBar } from "./style";
import { Navbar } from "react-bootstrap";

class Section extends React.Component {
  state = {
    data: {},
    length: -1,
    siteStructure: {},
    progress: 0,
    currSession: { currPage: 0, id: 0, questionIndex: 0 },
    order: [],
    answers: [],
    results: [],
  };

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  componentDidMount() {
    const data = studyData;
    const siteStructure = studyMeta;
    this.setState({
      data: data,
      siteStructure: siteStructure,
      length: data[0].length,
    });
    const questionOrder = localStorage.getItem("QuestionOrder");
    const progress = localStorage.getItem("Progress");
    const progressLabel = localStorage.getItem("ProgressLabel");
    const currSession = localStorage.getItem("currSession");
    const answers = localStorage.getItem("answers");
    if (questionOrder) {
      this.setState({ order: questionOrder });
    } else {
      var array = [...Array(data[0].length).keys()];
      const reorder = this.shuffle(array);
      this.setState({ order: reorder });
    }
    if (progress) {
      this.setState({ progress: progress });
    }
    if (progressLabel) {
      this.setState({ progressLabel: progressLabel });
    }
    if (currSession) {
      this.setState({ currSession: JSON.parse(currSession) });
    } else {
      this.setState({ currSession: { currPage: 0, id: 0, questionIndex: 0 } });
    }
    if (answers) {
      this.setState({ answers: JSON.parse(answers) });
    }
  }

  nextPage = () => {
    const currSession = this.state.currSession;
    currSession.currPage += 1;
    currSession.questionIndex = 0;
    // const currType = this.state.siteStructure.pages[currSession.currPage].type;
    // if (currType === "Section") {
    this.setProgressBar(0, "");
    // } else {
    //   this.setProgressBar(
    //     "Page " +
    //       (currSession.currPage / (this.state.siteStructure.pages.length - 1)) *
    //         100,
    //     currSession.currPage +
    //       " / " +
    //       (this.state.siteStructure.pages.length - 1)
    //   );
    // }
    localStorage.setItem("currSession", JSON.stringify(currSession));
    this.setState({ currSession: currSession });
    if (this.state.siteStructure.pages.length - 1 === currSession.currPage) {
      this.exportStudy();
    }
  };

  setProgressBar = (value, label) => {
    localStorage.setItem("Progress", value);
    localStorage.setItem("ProgressLabel", label);
    this.setState({ progress: value, progressLabel: label });
  };

  updatePage = (value) => {
    const currSession = this.state.currSession;
    const size = this.state.length;
    currSession.questionIndex += value;
    console.log(currSession, this.state.answers);
    if (currSession.questionIndex === size) {
      this.nextPage();
      return;
    }
    this.setProgressBar(
      (currSession.questionIndex / size) * 100,
      "Question " + currSession.questionIndex + " / " + size
    );
    localStorage.setItem("currSession", JSON.stringify(currSession));
    this.setState({ currSession: currSession });
  };

  prevQuestion = () => {
    this.updatePage(-1);
  };

  nextQuestion = () => {
    this.updatePage(1);
  };

  grabInformation = (data) => {
    console.log("grab Information");
    const currSession = this.state.currSession;
    currSession.demographic = data;
    const sessionID = this.state.siteStructure.meta.sessionID;
    if (sessionID in data) {
      currSession.id = data[sessionID];
    }
    localStorage.setItem("currSession", JSON.stringify(currSession));
    this.setState({ currSession: currSession });
  };

  saveAnswer = (field, answer) => {
    const newAnswers = this.state.answers.slice();
    if (this.state.currSession.questionIndex > newAnswers.length - 1) {
      newAnswers.push([field, answer]);
    } else {
      newAnswers[this.state.currSession.questionIndex] = [field, answer];
    }
    localStorage.setItem("answers", JSON.stringify(newAnswers));
    this.setState({ answers: newAnswers });
    return Promise.resolve(newAnswers);
  };

  exportStudy = () => {
    var FileSaver = require("file-saver");

    let jsonFile = {
      session: this.state.currSession,
      answers: this.state.answers,
    };

    var jsonse = JSON.stringify(jsonFile, null, 2);

    var blob = new Blob([jsonse], { type: "application/json" });
    FileSaver.saveAs(blob, "user" + this.state.currSession.id + ".json");
  };

  render() {
    return (
      <MyDiv>
        <MyContainer>
          <Navbar expand="lg" variant="light" bg="light">
            <MyProgressBar
              now={this.state.progress}
              label={this.state.progress + "%"}
              variant="info"
            />
          </Navbar>
          <Pages
            siteStructure={this.state.siteStructure}
            currPage={
              this.state.currSession != null
                ? this.state.currSession.currPage
                : undefined
            }
            data={this.state.data}
            order={this.state.order}
            grabInformation={this.grabInformation}
            saveAnswer={this.saveAnswer}
            nextPage={this.nextPage}
            prevQuestion={this.prevQuestion}
            nextQuestion={this.nextQuestion}
            answers={this.state.answers}
            exportStudy={this.exportStudy}
            results={this.state.results}
            questionIndex={
              this.state.currSession != null
                ? this.state.currSession.questionIndex
                : undefined
            }
          />
        </MyContainer>
      </MyDiv>
    );
  }
}

export default Section;
