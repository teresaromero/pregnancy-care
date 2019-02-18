import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

class _CalendarScreen extends React.Component {
  render() {
    let { user } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: 52 }}>
        <CalendarList
          selected={Date.now()}
          markedDates={{
            [Date.now()]: {selected: true, marked: true, selectedColor: 'blue'},
          }}
          firstDay={1}
          showWeekNumbers={true}
          onDayPress={day => {
            console.log("selected day", day);
          }}
        />
      </View>
    );
  }
}

export const CalendarScreen = connect(store => ({ user: store.user }))(
  _CalendarScreen
);
