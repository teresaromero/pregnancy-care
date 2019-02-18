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
        <Agenda selected={Date.now()} />
      </View>
    );
  }
}

export const CalendarScreen = connect(store => ({ user: store.user }))(
  _CalendarScreen
);
