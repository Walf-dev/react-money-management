import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase";

import authentication from "../../services/authentication";

import EmptyState from "./EmptyState";

import { ReactComponent as Finance } from "../../illustrations/personal_finance.svg";

import { ReactComponent as Wallet } from "../../illustrations/wallet.svg";

import { Box, Container, Grid, Hidden, Button, Card, } from "@material-ui/core";

class DashboardPage extends Component {
  signInWithEmailLink = () => {
    const { user } = this.props;

    if (user) {
      return;
    }

    const emailLink = window.location.href;

    if (!emailLink) {
      return;
    }

    if (auth.isSignInWithEmailLink(emailLink)) {
      let emailAddress = localStorage.getItem("emailAddress");

      if (!emailAddress) {
        this.props.history.push("/");

        return;
      }

      authentication
        .signInWithEmailLink(emailAddress, emailLink)
        .then((value) => {
          const user = value.user;
          const displayName = user.displayName;
          const emailAddress = user.email;

          this.props.openSnackbar(
            `Signed in as ${displayName || emailAddress}`
          );
        })
        .catch((reason) => {
          const code = reason.code;
          const message = reason.message;

          switch (code) {
            case "auth/expired-action-code":
            case "auth/invalid-email":
            case "auth/user-disabled":
              this.props.openSnackbar(message);
              break;

            default:
              this.props.openSnackbar(message);
              return;
          }
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    const { user } = this.props;

    if (user) {
      return (
        <>
        <EmptyState
          image={<Finance />}
          title="Dashboard"
          description="Welcome to Money Management Dashboard"
        />
        </>
      );
    }

    return (
      <EmptyState
        image={<Wallet />}
        title="Money Management"
        description="Easily manage your incomes and expenses ."
      />
    );
  }

  componentDidMount() {
    this.signInWithEmailLink();
  }
}

DashboardPage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(DashboardPage);
