import $ from 'jquery';
import { read_cookie } from 'sfcookies';

var url = "http://localhost:8000";

//----------------------LOGIN----------------------//
export const checkUserDataAtLogin=(api, username, password) =>
{
    return new Promise((resolve, reject) => {
        $.ajax({
          url: url + api,
          type: "POST",
          cache: false,
          contentType: 'application/json',
          data: JSON.stringify({username: username, password: password}),
          success: function(res) {
              resolve(res);
          },
          error: function(xhr, status, err){
              console.log(err);
              reject(err);
          }
        });
    });
}

//----------------------REGISTER----------------------//
export const registerUserToPlatform=(api, firstname, lastname, username, email, password, birthday, gender) =>
{
    return new Promise((resolve, reject) => {
        $.ajax({
          url: url + api,
          type: "POST",
          cache: false,
          contentType: 'application/json',
          data: JSON.stringify({firstname: firstname, lastname: lastname, username: username, email: email, password: password, birthday: birthday, gender: gender}),
          success: function(res) {
              resolve(res);
          },
          error: function(xhr, status, err){
              console.log(err);
              reject(err);
          }
        });
    });
}

//----------------------Post Image----------------------//
export const uploadPictureToPlatform=(api, fd) =>
{
    return new Promise((resolve, reject) => {
        var token = read_cookie('token')

        $.ajax({
          url: url + api,
          type: "POST",
          cache: false,
          contentType: false,
          processData: false,
          data: fd,
          headers: {
              'Authorization': 'Bearer ' + token
          },
          success: function(res) {
              resolve(res);
          },
          error: function(xhr, status, err){
              console.log(err);
              reject(err);
          }
        });
    });
}

//----------------------Post Story----------------------//
export const uploadStoryToPlatform=(api, title, content, userId) =>
{
    return new Promise((resolve, reject) => {
        var token = read_cookie('token')

        $.ajax({
          url: url + api,
          type: "POST",
          cache: false,
          contentType: 'application/json',
          data: JSON.stringify({title: title, content: content}),
          headers: {
              'Authorization': 'Bearer ' + token
          },
          success: function(res) {
              resolve(res);
          },
          error: function(xhr, status, err){
              console.log(err);
              reject(err);
          }
        });
    });
}
