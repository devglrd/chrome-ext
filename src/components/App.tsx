import React from "react";
import "./App.css";
import Profile from "../models/Profile";

interface State extends Profile {
}

export class App extends React.Component<{}, State> {
  state = {} as State

  public componentDidMount() {
    if (chrome && chrome.tabs) {
      chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const tab = tabs[0];
        chrome.tabs.sendMessage(tab.id || 0, {from: "popup", subject: "getFullName"}, response => {
          this.setState({
            fullName: response.fullName,
            title: response.title,
            country: response.country,
            imageSrc: response.imageSrc,
            couvertureImage: response.couvertureImage,
            actualCompanyImg: response.actualCompanyImg
          })
        });
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="couverture" style={{backgroundImage: `url(${this.state.couvertureImage})`}}>
          <img className="profile-image" src={this.state.imageSrc} alt={this.state.fullName}/>
          <img className="actual-company" src={this.state.actualCompanyImg} alt="Actual Company"/>
        </div>
        <div className="content">
          <div className="full-name">{this.state.fullName}</div>
          <div className="title">{this.state.title}</div>
        </div>
      </div>
    );
  }
}

export default App;
