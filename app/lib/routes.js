Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});


Router.route('signin', {
  name: 'signin',
  controller: 'SigninController',
  action: 'action',
  where: 'client'
});

Router.route('signup', {
  name: 'signup',
  controller: 'SignupController',
  action: 'action',
  where: 'client'
});

Router.route('edit_profile', {
  name: 'editProfile',
  controller: 'EditProfileController',
  action: 'action',
  where: 'client'
});

Router.route('verify_email', {
  name: 'verifyEmail',
  controller: 'VerifyEmailController',
  action: 'action',
  where: 'client'
});

Router.route('forgot_password', {
  name: 'forgotPassword',
  controller: 'ForgotPasswordController',
  action: 'action',
  where: 'client'
});

Router.route('reset_password', {
  name: 'resetPassword',
  controller: 'ResetPasswordController',
  action: 'action',
  where: 'client'
});

Router.route('session/pad/:padId', {
  name: 'pad',
  controller: 'PadController',
  action: 'action',
  where: 'client'
});

Router.route('session/:sessionId', {
  name: 'session',
  controller: 'SessionController',
  action: 'action',
  where: 'client'
});