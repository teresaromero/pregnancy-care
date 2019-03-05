import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import AppointmentsApi from "../lib/APIs/appointmentsAPI";
import { graphql } from "react-apollo";
import { currentUserCalendar } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

const enhance = branch(
  ({ data }) => data.loading,
  renderComponent(ActivityIndicator)
);

class CalendarScreen extends Component {
  constructor() {
    super();
    this.state = {
      items: {},
      markedDates: null
    };
  }

  componentWillMount() {
    let { appointments } = this.props.data.currentUser;
    let { LMP, EDC } = this.props.data.currentUser.record;

    let milestones = [
      {
        start: LMP,
        description: "Last Period Date",
        type: "Milestone",
        color: "#f28c81",
        selected: true
      },
      {
        start: EDC,
        description: "Estimated Date of Birth",
        type: "Milestone",
        color: "#f28c81",
        selected: true
      },
      {
        start: moment(LMP).add(8, "weeks"),
        description: `1st Visit - until ${moment(LMP)
          .add(10 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(12, "weeks"),
        description: `1st Ultrasound - until ${moment(LMP)
          .add(13 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(14, "weeks"),
        description: `2nd Visit - until ${moment(LMP)
          .add(16 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(19, "weeks"),
        description: `2nd Ultrasound - until ${moment(LMP)
          .add(21 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(22, "weeks"),
        description: `3rd Visit - until ${moment(LMP)
          .add(24 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(26, "weeks"),
        description: `4th Visit - until ${moment(LMP)
          .add(30 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(28, "weeks"),
        description: `5th Visit - until ${moment(LMP)
          .add(32 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      },
      {
        start: moment(LMP).add(34, "weeks"),
        description: `3rd Ultrasound - until ${moment(LMP)
          .add(36 * 7 + 6, "days")
          .format("DD-MM-YYYY")}`,
        type: "Milestone",
        color: "#8ac6bf",
        selected: true
      }
    ];
    milestones.map(m => appointments.push(m));
    let markedDates = {};
    let displayItems = {};
    appointments.map(ap => {
      ap.type === "Milestone"
        ? (markedDates[moment(ap.start).format("YYYY-MM-DD")] = {
            marked: ap.marked,
            selected: ap.selected,
            selectedColor: ap.color,
            dotColor: ap.color,
            activeOpacity: 0
          })
        : (markedDates[moment(ap.start).format("YYYY-MM-DD")] = {
            marked: false,
            selected: true,
            selectedColor: "#f28c81",
            activeOpacity: 0
          });
      displayItems[moment(ap.start).format("YYYY-MM-DD")] = [
        ap.type === "Milestone"
          ? { text: ap.description, time: "" }
          : { text: ap.description, time: moment(ap.start).format("HH:mm") }
      ];
      this.setState({ markedDates, items: displayItems });
    });
  }

  loadItems(day) {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);

      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
      }
    }

    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });

    this.setState({
      items: newItems
    });
  }
  renderDay(day, item) {
    return (
      <View
        style={{
          width: 70,
          paddingLeft: 10,
          paddingRight: 10,

          backgroundColor: "transparent",
          justifyContent: "start"
        }}
      >
        {day ? (
          <View
            style={{
              padding: 10,
              marginTop: 5,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <Text style={{ fontWeight: "100", fontSize: 25 }}>
              {moment(day.timestamp).format("DD")}
            </Text>
            <Text style={{ fontWeight: "100" }}>
              {moment(day.timestamp).format("ddd")}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }

  renderItem(item) {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          marginTop: 5,
          marginBottom: 10,
          marginRight: 5,
          padding: 10,
          height: "auto"
        }}
      >
        <Text>{item.time}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 5,
          marginBottom: 10,
          marginRight: 5,
          padding: 10,
          backgroundColor: "hsl(0, 0%, 98%)",
          alignContent: "center"
        }}
      />
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={day => this.loadItems(day)}
          rowHasChanged={(r1, r2) => this.rowHasChanged(r1, r2)}
          markedDates={this.state.markedDates}
          monthFormat={"MMMM yyyy"}
          theme={{
            calendarBackground: "white",
            backgroundColor: "hsl(0, 0%, 96%)",
            agendaKnobColor: "#01395c",
            dayTextColor: "#01395c",
            selectedDayBackgroundColor: "#7c96c8",
            selectedDayTextColor: "#01395c",
            todayTextColor: "#f28c81"
          }}
          renderDay={(day, item) => this.renderDay(day, item)}
          renderItem={i => this.renderItem(i)}
          renderEmptyDate={() => this.renderEmptyDate()}
        />
      </View>
    );
  }
}

export default graphql(currentUserCalendar)(enhance(CalendarScreen));
