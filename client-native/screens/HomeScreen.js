import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text, Button, Icon, Image } from "react-native-elements";
import Slider from "react-native-slider";
import moment from "moment";
import { graphql } from "react-apollo";
import { currentUserQueryHome } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

const enhance = branch(
  ({ data }) => data.loading,
  renderComponent(ActivityIndicator)
);

const getImage = week => {
  if (week >= 1 && week < 6) {
    return require("../assets/images/sizes/4.png");
  } else if (week === 6) {
    return require("../assets/images/sizes/6.png");
  } else if (week >= 7 && week <= 8) {
    return require("../assets/images/sizes/7.png");
  } else if (week === 9) {
    return require("../assets/images/sizes/9.png");
  } else if (week >= 10 && week <= 11) {
    return require("../assets/images/sizes/10.png");
  } else if (week === 12) {
    return require("../assets/images/sizes/12.png");
  } else if (week === 13) {
    return require("../assets/images/sizes/13.png");
  } else if (week === 14) {
    return require("../assets/images/sizes/14.png");
  } else if (week === 15) {
    return require("../assets/images/sizes/15.png");
  } else if (week === 16) {
    return require("../assets/images/sizes/16.png");
  } else if (week >= 17 && week <= 19) {
    return require("../assets/images/sizes/17.png");
  } else if (week === 20) {
    return require("../assets/images/sizes/20.png");
  } else if (week === 21) {
    return require("../assets/images/sizes/21.png");
  } else if (week === 22) {
    return require("../assets/images/sizes/22.png");
  } else if (week === 23) {
    return require("../assets/images/sizes/23.png");
  } else if (week >= 24 && week <= 25) {
    return require("../assets/images/sizes/24.png");
  } else if (week >= 26 && week <= 28) {
    return require("../assets/images/sizes/26.png");
  } else if (week === 29) {
    return require("../assets/images/sizes/29.png");
  } else if (week === 30) {
    return require("../assets/images/sizes/30.png");
  } else if (week >= 31 && week <= 32) {
    return require("../assets/images/sizes/31.png");
  } else if (week === 33) {
    return require("../assets/images/sizes/33.png");
  } else {
    return require("../assets/images/sizes/36.png");
  }
};

const weekNum = ({ data }) => {
  return parseInt(moment().diff(data.currentUser.record.LMP, "weeks"));
};

const Home = ({ data, navigation }) => (
  <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
    <ScrollView>
      <View
        style={{
          paddingTop: 10,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={getImage(weekNum({ data }))}
          style={{ width: 200, height: 200, padding: 10 }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          paddingTop: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 20 }}>
          You are now {moment().diff(data.currentUser.record.LMP, "weeks")}{" "}
          weeks pregnant
        </Text>
      </View>
      <View
        style={{
          paddingTop: 20,
          flex: 1,
          marginLeft: 50,
          marginRight: 50,
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <Slider
          value={moment().diff(data.currentUser.record.LMP, "weeks")}
          maximumValue={40}
          minimumValue={0}
          minimumTrackTintColor="#01395c"
          thumbImage={require("../assets/images/sliderIcon.png")}
          thumbTintColor="#01395c"
          thumbStyle={{
            width: 32,
            height: 32,
            borderRadius: 30 / 2,
            borderColor: "#01395c",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 1
          }}
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
        <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 20 }}>
          Your estimated date of birth is:
        </Text>
        <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 20 }}>
          {moment(data.currentUser.record.EDC).format("dddd")}
        </Text>
        <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 20 }}>
          {moment(data.currentUser.record.EDC).format("Do MMMM YYYY")}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 35,
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          type="clear"
          title="Progress"
          titleStyle={{ color: "#01395c", paddingRight: 15 }}
          iconRight
          icon={
            <Icon
              name="arrow-right"
              type="font-awesome"
              size={15}
              color="#01395c"
            />
          }
          onPress={() => navigation.navigate("Progress")}
        />
      </View>
      <View
        style={{
          paddingTop: 5,
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          type="clear"
          title="Important Information"
          titleStyle={{ color: "#01395c", paddingRight: 15 }}
          iconRight
          icon={
            <Icon
              name="arrow-right"
              type="font-awesome"
              size={15}
              color="#01395c"
            />
          }
          onPress={() => navigation.navigate("Information")}
        />
      </View>
    </ScrollView>
  </View>
);

export default graphql(currentUserQueryHome)(enhance(Home));
