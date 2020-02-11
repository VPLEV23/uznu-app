import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Контакти</b>
              <p className="flow-text grey-text text-darken-1">
                Ти у війшов на сайт Мат Факу{" "}
                <span style={{ fontFamily: "monospace" }}>uznu</span> app 👏
              </p>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
