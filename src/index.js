/**
 * This is the boilerplate repository for creating joules.
 * Forking this repository should be the starting point when creating a joule.
 */

/*
 * The handler function for all API endpoints.
 * The `event` argument contains all input values.
 *    event.httpMethod, The HTTP method (GET, POST, PUT, etc)
 *    event.{pathParam}, Path parameters as defined in your .joule.yml
 *    event.{queryStringParam}, Query string parameters as defined in your .joule.yml
 */
var Response = require('joule-node-response');
var sgMail = require('@sendgrid/mail');

exports.handler = function(event, context) {
	var response = new Response();
	response.setContext(context);
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Origin', 'csmforchrist.com');
  if(event.httpMethod == 'POST') {
    var body = "Someone subscribed to receive education\n\n" +
               event.post['FNAME'] + "\n" +
               event.post['LNAME'] + "\n" +
               event.post['EMAIL'] + "\n";

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    var msg = {
      to: 'jaisen@jmathai.com',
      from: 'jaisen@jmathai.com',
      subject: 'New CSM subscriber for education',
      text: body
    };
    sgMail.send(msg, function(error, success) {
      response.send(error || success);
    });
  } else {
    response.send('Got it');
  }
};
