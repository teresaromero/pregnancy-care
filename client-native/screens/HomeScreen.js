import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text, Header, Button, Icon, Tile } from "react-native-elements";
import Slider from "react-native-slider";
import { connect } from "react-redux";
import PatientsApi from "../lib/APIs/patientsApi";
import moment from "moment";
import { getPatient } from "../lib/redux/actions";

class _Home extends React.Component {
  componentDidMount() {
    let { user, dispatch } = this.props;
    PatientsApi.getPatient(user._id).then(patient => {
      dispatch(getPatient(patient));
    });
  }

  render() {
    let { patient } = this.props;
    let { navigate } = this.props.navigation;
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          {patient ? (
            <ScrollView>
              <Tile
                imageSrc={require("../assets/images/pexels-photo-57529.jpeg")}
                titleStyle={{
                  fontWeight: "200",
                  textShadowColor: "#01395c",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3
                }}
                imageContainerStyle={{ opacity: 0.8 }}
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
                <Text style={{ fontWeight: "200", fontSize: 40 }}>
                  You are now
                </Text>
                <Text style={{ fontWeight: "300", fontSize: 40 }}>
                  {moment().diff(patient.recordId.LMP, "weeks")}
                </Text>
                <Text style={{ fontWeight: "200", fontSize: 40 }}>weeks!!</Text>
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
                  paddingTop: 20,
                  flex: 1,
                  marginLeft: 20,
                  marginRight: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button
                  type="clear"
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
export const Home = connect(store => ({
  user: store.user,
  patient: store.patient
}))(_Home);
