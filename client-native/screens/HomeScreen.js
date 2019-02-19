import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Card, Text, Header, Button, Icon, Tile } from "react-native-elements";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";
import moment from "moment";

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
      this.setState({ patient }, () => {
        console.log(this.state.patient.recordId.LMP);
      });
    });
  }

  render() {
    let { user } = this.props;
    let { patient } = this.state;
    return (
      <React.Fragment>
        <Header
          centerComponent={{
            text: "Pregnancy Care 🤰🏼",
            style: { color: "#fff" }
          }}
          rightComponent={
            <Button
              type="clear"
              icon={
                <Icon
                  name="power-off"
                  type="font-awesome"
                  size={15}
                  color="#FF3860"
                />
              }
              titleStyle={{ color: "#FF3860" }}
              onPress={() => this.handleLogOut()}
            />
          }
          containerStyle={{
            borderColor: "#0393df",
            backgroundColor: "#0393df"
          }}
        />
        <View style={{ flex: 1 }}>
          {patient ? (
            <ScrollView>
              <Tile
                imageSrc={require("../assets/images/pexels-photo-57529.jpeg")}
                title={`Welcome ${patient.name}!!`}
                featured
                caption=""
              />
              <View
                style={{
                  paddingTop: 7,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text h4>You are now</Text>
                <Text h3>{moment().diff(patient.recordId.LMP, "weeks")}</Text>
                <Text h4>weeks!!</Text>
              </View>
              <View
                style={{
                  paddingTop: 7,
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              ></View>
            </ScrollView>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </React.Fragment>
    );
  }
}
export const Home = connect(store => ({ user: store.user }))(_Home);
