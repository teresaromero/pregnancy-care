import React from "react";
import { ScrollView, Text, ActivityIndicator, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";

class _Home extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: null
    };
  }

  componentDidMount() {
    let { user } = this.props;
    PatientsApi.getPatient(user._id).then(patient => {
      this.setState({ patient });
    });
  }

  render() {
    let { user } = this.props;
    let { patient } = this.state;
    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        {patient ? (
          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            <Card>
              <Text>Hola {user.name}</Text>
              <Text>{patient.recordId.allergies}</Text>
            </Card>
          </ScrollView>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
export const Home = connect(store => ({ user: store.user }))(_Home);
