import React, {Component} from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { bake_cookie } from 'sfcookies';

import {checkUserDataAtLogin} from '../API/POST/PostMethods';

class Login extends Component {
    constructor() {
        super();

        this.state = {
          username: "",
          userID: "",
          password: "",
          token: "",
          message: "",
          redirectToFeed: false
        }

        this.api = '/user/loginUser';
        this.handleSubmit = this.handleSubmit.bind(this);

        this.pageTitle = "Log in to Social Webpage";
        document.title = this.pageTitle;
    }

    //Post user login data and check if they are correct
    async handleSubmit(event) {
        event.preventDefault();

        this.state.username =  event.target[0].value;
        this.state.password =  event.target[1].value;

        const response = await checkUserDataAtLogin(this.api, this.state.username, this.state.password);

        //Do something with response
        this.setState({message : JSON.parse(response).message});
        this.setState({token : JSON.parse(response).token});

        //Save token and userID in session
        if(this.state.message === "Correct credentials") {
            //Redirect to feed when successfull login
            bake_cookie("token", this.state.token);
            this.setState({ redirectToFeed: true });
        } else {
            //Error messages
            let errorField = document.getElementById("error-message");
            let messageText = "<b>"+this.state.message+"</b>";
            errorField.innerHTML = messageText;
        }
    }


    render() {
        const { redirectToFeed } = this.state;
         if (redirectToFeed) {
           return <Redirect to='/' />;
         }

        return (
          <div id ="body-div">
            <div>

              <div id="login-menu">
                <Link to="/login"><span id="login-active" className="login-menu-label">Sign Up</span></Link>
                <Link to="/register"><span id="login-inactive" className="login-menu-label">Register</span></Link>
              </div>

              <div id="ourProduct">
              </div>

              <div id="formularLogin">
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                      <Input inverted className="login-input-text" placeholder='Username' name="username" />
                    </Form.Field>
                    <Form.Field required>
                      <Input className="login-input-text" type="password" placeholder='Password' name="password" />
                    </Form.Field>

                    <Button inverted className="ui basic" id="login-button-submit" type="submit" animated='fade'>
                      <Button.Content visible>
                        Login
                      </Button.Content>
                      <Button.Content hidden>
                        Enter the platform!
                      </Button.Content>
                    </Button>

                    <div id="error-message">
                    </div>

                  </Form>
              </div>
            </div>
          </div>
        )
    }
}

export default Login;
