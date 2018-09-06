import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAstronaut } from "../astronautActions.js";
import AstronautForm from "../components/AstronautForm.js";
import validate from "../astronautValidation.js";

// parses dateString "YYYY-MM-DD" and returns { year: Number, month: Number, day: Number}
const dateStringToObject = d => {
  if (d === undefined) {
    throw new Error("Missing argument");
  }
  if (!/\d{4}-\d{2}-\d{2}/.test(d)) {
    throw new Error("Invalid argument");
  }
  const dateArray = d.split("-").map(v => v.replace(/^0+/, ""));

  return { year: dateArray[0], month: dateArray[1], day: dateArray[2] };
};

// returns dateString "YYYY-MM-DD"
const dateObjectToString = d =>
  `${d.year.padStart(4, "0")}-${d.month.padStart(2, "0")}-${d.day.padStart(
    2,
    "0"
  )}`;

const Header = () => (
  <header className="container-fluid">
    <div className="container">
      <h1>Astronaut Page</h1>
      <Link to="/">...return</Link>
    </div>
  </header>
);

const Dialog = props => (
  <div>
    <h4>{props.children}</h4>
  </div>
);

class NewAstronautPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        firstName: "",
        lastName: "",
        birth: { year: "", month: "", day: "" },
        superpower: ""
      },
      touched: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    console.log("reset form");
  }

  handleChange(field) {
    this.setState(prev => ({ fields: { ...prev.fields, ...field } }));
  }

  handleSubmit() {
    this.props.dispatch(addAstronaut(this.state.fields));
  }

  handleBlur(field) {
    this.setState(prev => ({ touched: { ...prev.touched, ...field } }));
  }

  render() {
    const { saving, error, response } = this.props;

    if (saving) {
      return (
        <Fragment>
          <Header />
          <Dialog>saving...</Dialog>
        </Fragment>
      );
    } else if (response) {
      return (
        <Fragment>
          <Header />
          <Dialog>
            {`Astronaut ${response.firstName} ${response.lastName} was added.`}
          </Dialog>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Header />
          <AstronautForm
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            fields={this.state.fields}
            onSubmit={this.handleSubmit}
            errors={validate(this.state.fields)}
            touched={this.state.touched}
            submitting={saving}
          />
          {error && <Dialog>{error.message}</Dialog>}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({ ...state.newAstronaut });

export default connect(mapStateToProps)(NewAstronautPage);
