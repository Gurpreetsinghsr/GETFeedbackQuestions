import React, { Component } from "react";
import axios from "axios";
class Feedback extends Component {
  state = {
    QNA: [],
    questionNo: 0,
    AnsweredQNA: [],
  };
  async componentDidMount() {
    const { data: QNA } = await axios.get("http://localhost:3000/QNA");
    this.setState({ QNA });
  }
  onNext = () => {
    var questionNo = this.state.questionNo;
    questionNo = questionNo + 1;
    this.setState({ questionNo });
  };

  onBack = () => {
    var questionNo = this.state.questionNo;
    questionNo = questionNo - 1;
    this.setState({ questionNo });
  };
  onSubmit = () => {
    const post = this.state.AnsweredQNA.filter((x) => x !== undefined);
    console.log(post, "on submit post");
  };
  onValueChange = (event) => {
    var AnsweredQNA = [...this.state.AnsweredQNA];
    var QNA = this.state.QNA;
    var questionNo = this.state.questionNo;
    var Answered = {
      id: questionNo,
      question: QNA[questionNo].question,
      input: event.target.value,
    };
    AnsweredQNA[questionNo] = Answered;
    this.setState({ AnsweredQNA });
    if (questionNo !== QNA.length - 1) {
      questionNo = questionNo + 1;

      this.setState({ questionNo });
    }
    // console.log(AnsweredQNA, "Answered QNA");
    // console.log(questionNo, "question no.");
  };
  handleQuestionRendering = () => {
    const questionNo = this.state.questionNo;
    const QNA = this.state.QNA;
    return (
      <div className="container">
        <p>
          {QNA[questionNo].id}:- {QNA[questionNo].question}
          <br />
          <ol>
            {QNA[questionNo].options.map((x) => (
              <li key={x}>
                <label className="m-2 p-2">
                  <input
                    type="radio"
                    value={x}
                    checked={
                      questionNo in this.state.AnsweredQNA &&
                      this.state.AnsweredQNA[questionNo].input === x
                    }
                    name={QNA[questionNo].id}
                    onChange={this.onValueChange}
                  />{" "}
                  {x}
                </label>
              </li>
            ))}
          </ol>
        </p>
        {this.state.questionNo !== 0 ? (
          <button className="btn btn-warning m-2 p-2" onClick={this.onBack}>
            Back
          </button>
        ) : null}

        {this.state.questionNo !== this.state.QNA.length - 1 ? (
          <button className="btn btn-primary m-2 p-2" onClick={this.onNext}>
            Next
          </button>
        ) : null}

        {this.state.questionNo === this.state.QNA.length - 1 ? (
          <button className="btn btn-primary m-2 p-2" onClick={this.onSubmit}>
            Submit
          </button>
        ) : null}
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.state.QNA.length === 0 ? (
          <h3>No Feedback Questions</h3>
        ) : (
          this.handleQuestionRendering()
        )}
      </div>
    );
  }
}

export default Feedback;
