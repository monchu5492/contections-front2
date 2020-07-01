import React from "react";
import { Button, Card, Image, Modal, Popup } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import EditEventForm from "./EditEventform";
import JoinModalButton from "./JoinModalButton";
// , margin: "auto"
// style={{ width: "max-content" }}
export default class CardExampleGroups extends React.Component {
  onCardClick = () => {
    // return <EventInfoCard />;
  };

  // eventMaker = () => {
  //   console.log(this.props.currentEvent);
  //   let eventId = this.props.currentEvent.user_id;
  //   return this.props.users.filter(user => {
  //     return user.id == eventId;
  //   });
  // };

  render() {
    // const eventMakerId = this.props.currentEvent.user.id;
    // console.log(eventMakerId);
    console.log(this.props.user.id);
    // const eventMaker =
    console.log(this.props.currentEvent.join_events);
    return (
      <Card
        style={{
          marginRight: "10%",
          display: "inline-block",
          margin: "0.5em",
          height: "340px",
        }}
      >
        {console.log(this.props.currentEvent, "currentEvent card props")}
        <Card.Content
          textAlign="center"
          style={{
            backgroundImage: `url(${this.props.currentEvent.picture})`,
            backgroundSize: "cover",
            height: "-webkit-fill-available",
          }}
        >
          <Card.Header style={{ color: "aquamarine" }}>
            Event Created By {this.props.currentEvent.user.user_name}
          </Card.Header>
          <Card.Meta style={{ marginTop: "10px", color: "cyan" }}>
            {this.props.currentEvent.name} project
          </Card.Meta>
          <Card.Description
            style={{
              color: "deepskyblue",
              transition: "color 0.1s ease",
              transitionProperty: "color",
              transitionDuration: "0.1s",
              transitionTimingFunction: "ease",
              transitionDelay: "0s",
            }}
          >
            {/* want to put pop up on this lement to display joined users */}
            <p
              style={{
                marginBottom: "0",
                width: "max-content",
                float: "right",
              }}
            >
              {this.props.currentEvent.join_events.length}
            </p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra style={{ backgroundColor: "paleturquoise" }}>
          <div className="ui two buttons">
            {this.props.currentEvent.user.id !== this.props.user.id ? (
              <JoinModalButton
                user={this.props.user}
                currentEvent={this.props.currentEvent}
                joinEvent={this.props.joinEvent}
                eventChange={this.props.eventChange}
              />
            ) : (
              <div>
                <EditEventForm
                  // style={{ position: "left" }}
                  user={this.props.user}
                  updateEvent={this.props.updateEvent}
                  deleteEvent={this.props.deleteEvent}
                  currentEvent={this.props.currentEvent}
                />
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// "Snooze",
//                 { key: "done", content: "Done", positive: true }
//               ]}
