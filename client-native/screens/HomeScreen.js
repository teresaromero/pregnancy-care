import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text, Header, Button, Icon, Tile } from "react-native-elements";
import Slider from "react-native-slider";
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
    let { patient } = this.state;
    let { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          {patient ? (
            <ScrollView>
              <Tile
                imageSrc={require("../assets/images/pexels-photo-57529.jpeg")}
                title={`Welcome ${patient.name}!!`}
                titleStyle={{
                  textShadowColor: "black",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 1
                }}
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
                  paddingTop: 2,
                  flex: 1,
                  marginLeft: 15,
                  marginRight: 15,
                  justifyContent: "center",
                  alignItems: "stretch"
                }}
              >
                <Slider
                  value={moment().diff(patient.recordId.LMP, "weeks")}
                  maximumValue={40}
                  minimumValue={0}
                  minimumTrackTintColor="#01395c"
                  thumbImage={require("../assets/images/baby.png")}
                  thumbTintColor="transparent"
                  disabled={true}
                />
              </View>
              <View
                style={{
                  paddingTop: 15,
                  flex: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  icon={
                    <Icon
                      type="font-awesome"
                      name="user-md"
                      size={20}
                      color="white"
                    />
                  }
                  title=" See Progress"
                  onPress={() => navigate("Record")}
                />
              </View>
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
