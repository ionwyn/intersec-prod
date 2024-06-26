import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from 'auth/store/actions/index';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles/index';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FuseAnimate } from '@fuse';

const styles = theme => ({
  root: {
    background:
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
    backgroundSize: 'cover',
  },
  intro: {
    color: '#ffffff',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
});

class Login extends Component {
  onSubmit = model => {
    this.props.submitLogin(model);
  };

  loginWithFireBase = () => {
    const model = this.form.getModel();
    this.props.loginWithFireBase(model);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.login.error &&
      (this.props.login.error.username || this.props.login.error.password)
    ) {
      this.form.updateInputsWithError({
        ...this.props.login.error,
      });

      this.props.login.error = null;
      this.disableButton();
    }

    if (this.props.user.role !== 'guest') {
      const pathname =
        this.props.location.state && this.props.location.state.redirectUrl
          ? this.props.location.state.redirectUrl
          : '/';
      this.props.history.push({
        pathname,
      });
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    const loginTo =
      process.env.NODE_ENV !== 'production'
        ? process.env.loginTo ||
          'https://spotify-deploy.onrender.com?env=development'
        : process.env.loginTo ||
          'https://spotify-deploy.onrender.com?env=production';

    console.log(loginTo);

    return (
      <div
        className={classNames(
          classes.root,
          'flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0'
        )}
      >
        <div
          className={classNames(
            classes.intro,
            'flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left'
          )}
        >
          <FuseAnimate animation="transition.expandIn">
            <img
              className="w-128 mb-32"
              src="assets/images/logos/fuse.svg"
              alt="logo"
            />
          </FuseAnimate>

          <FuseAnimate animation="transition.slideUpIn" delay={300}>
            <Typography
              variant="display2"
              color="inherit"
              className="font-light"
            >
              Intersect
            </Typography>
          </FuseAnimate>

          <FuseAnimate delay={400}>
            <Typography
              variant="subheading"
              color="inherit"
              className="max-w-512 mt-16"
            >
              Know more about what you're listening to.
            </Typography>
          </FuseAnimate>
        </div>

        <FuseAnimate animation={{ translateX: [0, '100%'] }}>
          <Card className={classNames(classes.card, 'mx-auto m-16 md:m-0')}>
            <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
              <img
                src="assets/images/logos/spotify_logo_with_text.svg"
                alt="Spotify Logo"
              />
              <Button
                className="px-4"
                component="a"
                href={loginTo}
                target="_self"
                rel="noreferrer noopener"
                fullWidth={true}
                variant="flat"
              >
                <img
                  src="assets/images/logos/spotifylogin.svg"
                  alt="Login with Spotify Button"
                />
              </Button>
            </CardContent>
          </Card>
        </FuseAnimate>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submitLogin: Actions.submitLogin,
      loginWithFireBase: Actions.loginWithFireBase,
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    login: auth.login,
    user: auth.user,
  };
}

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Login)
  )
);
