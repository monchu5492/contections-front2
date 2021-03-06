import React from "react";
import GMaps from "./GMap";
import { Button, Modal, Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
// Form, Header, Image,

export default class JoinModalButton extends React.Component {
  //testing modal click functionality
  state = { open: false };
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });
  //-------------------------------------------
  handleOnClick = (e) => {
    // this.props.closeFirstModal();
    this.props.joinEvent(
      this.props.currentEvent,
      console.log("HIT JOIN EVENT!!", this.props.currentEvent)
    );
    this.props.eventChange(this.props.currentEvent);
    this.close();
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    return (
      <div>
        <Button
          onClick={this.closeConfigShow(false, true)}
          color="orange"
          inverted
        >
          Join Event
        </Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>would you like to join this event</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="small" src={this.props.currentEvent.picture} />
            <Modal.Description>
              {console.log(this.props.currentEvent)}
              <Header>{this.props.currentEvent.name}</Header>
              <p>{this.props.currentEvent.address}</p>
              <a href={this.props.currentEvent.links}>
                {this.props.currentEvent.links}
              </a>
              <p>{this.props.currentEvent.description}</p>
              <p>{this.props.currentEvent.user.user_name}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.handleOnClick}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Join Event"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
