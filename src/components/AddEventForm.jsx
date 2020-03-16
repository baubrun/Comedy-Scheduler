import React, { Component } from "react";

class AddEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      venue: "",
      performer: "",
      image: "",
      price: "",
      hostId: this.props.hostId,
      defaultVenues: [],
      noVenues: false,
      calendarViewShow: false,
      listViewShow: true
    };
  }
  render() {
    return (
<>
<div id="id01" class="modal">
  <form class="modal-content" >
    <div class="container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email" required/>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required/>

      <label for="psw-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
      
      <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me</input>
      </label>

      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

      <div class="clearfix">
        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
        <button type="submit" class="signupbtn">Sign Up</button>
      </div>
    </div>
  </form>
</div>
</>

    );
  }
}

export default AddEventForm;
