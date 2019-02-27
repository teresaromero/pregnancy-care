import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Divider, Card } from "react-native-elements";
import { Agenda } from "react-native-calendars";
import { connect } from "react-redux";
import moment from "moment";
import AppointmentsApi from "../lib/APIs/appointmentsAPI";

class _CalendarScreen extends Component {
  constructor() {
    super();
    this.state = {
      items: {},
      appointments: null,
      markedDates: null
    };
  }

  componentWillMount() {
    let { user } = this.props;
    AppointmentsApi.allAppointments(user._id).then(res => {
      let { appointments } = res;
      this.setState({ appointments }, () => {
        let markedDates = {};
        let displayItems = {};
        appointments.map(ap => {
          markedDates[moment(ap.start).format("YYYY-MM-DD")] = {
            marked: true,
            dotColor: "#f28c81",
            activeOpacity: 0
          };
          displayItems[moment(ap.start).format("YYYY-MM-DD")] = [
            { text: ap.description, time: moment(ap.start).format("HH:mm") }
          ];
          this.setState({ markedDates, items: displayItems });
        });
      });
    });
  }

  loadItems(day) {
    setTimeout(() => {
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
    }, 1000);
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
        <Text>⏰ {item.time}</Text>
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
          selectedDayBackgroundColor: "#f28c81",
          selectedDayTextColor: "#01395c",
          todayTextColor: "#f28c81"
        }}
        renderDay={(day, item) => this.renderDay(day, item)}
        renderItem={i => this.renderItem(i)}
        renderEmptyDate={() => this.renderEmptyDate()}
      />
    );
  }
}


export const CalendarScreen = connect(store => ({ user: store.user }))(
  _CalendarScreen
);
