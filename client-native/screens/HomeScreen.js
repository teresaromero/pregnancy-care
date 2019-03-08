import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text, Button, Icon, Image, Avatar } from "react-native-elements";
import Slider from "react-native-slider";
import moment from "moment";
import { graphql } from "react-apollo";
import { currentUserQueryHome } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";
import getImage from "../lib/getImage";
const enhance = branch(
  ({ currentUserQueryHome }) => currentUserQueryHome.loading,
  renderComponent(ActivityIndicator)
);

const weekNum = ({ currentUserQueryHome }) => {
  return parseInt(
    moment().diff(currentUserQueryHome.currentUser.record.LMP, "weeks")
  );
};

const Home = ({ currentUserQueryHome, navigation }) => (
  <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Avatar
        overlayContainerStyle={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        source={getImage(weekNum({ currentUserQueryHome }))}
        resizeMode="cover"
        size="xlarge"
      />
    </View>
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 20 }}>
        You are now{" "}
        {moment().diff(currentUserQueryHome.currentUser.record.LMP, "weeks")}{" "}
        weeks pregnant
      </Text>
    </View>
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        justifyContent: "center"
      }}
    >
      <Slider
        value={moment().diff(
          currentUserQueryHome.currentUser.record.LMP,
          "weeks"
        )}
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
        paddingTop: 10,
        marginTop: 10,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8FB9AA"
      }}
    >
      <Text style={{ fontFamily: "SourceSansPro-Light", fontSize: 20 }}>
        Your estimated date of birth is:
      </Text>
      <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 20 }}>
        {moment(currentUserQueryHome.currentUser.record.EDC).format("dddd")}
      </Text>
      <Text style={{ fontFamily: "SourceSansPro-Regular", fontSize: 20 }}>
        {moment(currentUserQueryHome.currentUser.record.EDC).format(
          "Do MMMM YYYY"
        )}
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
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
  </View>
);

export default graphql(currentUserQueryHome, { name: "currentUserQueryHome" })(
  enhance(Home)
);
