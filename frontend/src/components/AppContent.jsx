import React, {Component} from "react";
import {toast, ToastContainer} from "react-toastify";
import Buttons from "./Buttons";

export default class AppContent extends Component {
  constructor(props) {
    super(props);

    this.getHealth = () => {
      this.props.apiService.checkHealth().then(health => {
        toast.success('Api returned: ' + JSON.stringify(health));
      });
    };
  }

  componentDidMount() {
    if (this.props.state.user == null) {
      this.props.getUser();
    }
  }

  render() {
    return (<>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover/>

      <Buttons renewToken={this.props.renewToken}
               getHealth={this.getHealth}
               getHistory={this.props.getHistory}
               user={this.props.state.user}
      />
      {this.props.state.user == null &&
        <div className="flex justify-content-center mt-4">
          Sie sind nicht eingeloggt!
        </div>
      }
    </>);
  }
}
