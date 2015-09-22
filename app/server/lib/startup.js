Meteor.startup(function(){

//server / smtp
	smtp = {
		username: "concert.assist",
		password: "Shannu17",
		server: "smtp.gmail.com",
		port: 25
	};

	process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

	if (Meteor.isServer) {
// upload blank image for absence of profile picture		
		uploadnoImage();

// Default from email address for accounts
		Accounts.emailTemplates.from = "Concert Support <concert.assist@gmail.com>";

// Public name for the application
		Accounts.emailTemplates.siteName = "Concert";

// A Function that takes a user object and returns a String for the subject line of the email.
	  Accounts.emailTemplates.verifyEmail.subject = function(user) {
	    return 'Confirm Your Email Address';
	  };

// A Function that takes a user object and a url, and returns the body text for the email.
// Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
/*	  Accounts.emailTemplates.verifyEmail.html = function(user, url) {
	  	emailText = 'Thank you for signing up with concert.' + '\n\n' +
	  				'Click on the following link to verify your email address: ' + url + '\n\n' +
	  				'For any queries, please reply back to this email.';
	    return emailText;
	  };  		*/

	}

});