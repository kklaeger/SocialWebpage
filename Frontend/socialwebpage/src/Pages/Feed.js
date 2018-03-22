import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'
import FeedTab from '../Components/FeedTab.js';

import {callFetch, checkSession, deleteSession} from '../API/GET/GetMethods';
import '../profileStyle.css';

var iso = require('isomorphic-fetch');
var es = require('es6-promise').polyfill();


class Profile extends Component {
    constructor() {
        super();

        this.state = {
          redirectToLogin: false
        }

        this.apiCheckSession = "/checkSession"
        this.apiDeleteSession = "/deleteSession";

        this.checkThisSession();

        this.pageTitle = "Social Webpage Home";
        document.title = this.pageTitle;
    }

    checkThisSession() {
        //callFetch("GET", this.apiCheckSession, null);
        checkSession(this.apiCheckSession);

    }

    handleLogout() {
        deleteSession(this.apiDeleteSession);

        this.setState({ redirectToLogin: true });
    }


    render() {
        const { redirectToLogin } = this.state;
         if (redirectToLogin) {
           return <Redirect to='/login'/>;
         }

        return (
          <div>
            <div id="feed">

              <div id="mobile-header">
                <Link to="/profile">
                  <Button circular size="medium" id="profile-button-mobile" icon>
                    <Icon className="menu-icons" name='user' />
                    Profile
                  </Button>
                </Link>

                <Button circular size="medium" id="logout-button-mobile" icon onClick={this.handleLogout.bind(this)}>
                    <Icon className="menu-icons" name='log out' />
                    Log out
                </Button>

              </div>

              <div id="feed-header">
                <Link to="/profile">
                  <Button circular size="medium" id="profile-button" icon>
                    <Icon className="menu-icons" name='user' />
                    Profile
                  </Button>
                </Link>

                <Button circular size="medium" id="logout-button" icon onClick={this.handleLogout.bind(this)}>
                    <Icon className="menu-icons" name='log out' />
                    Log out
                </Button>

              </div>

            </div>

            <div id="feed-content">
                <FeedTab />
            </div>

          </div>
        )
    }
}

export default Profile;