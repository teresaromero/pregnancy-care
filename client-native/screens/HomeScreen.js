import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Text, Button, Tile, Icon } from "react-native-elements";
import Slider from "react-native-slider";
import moment from "moment";
import { graphql } from "react-apollo";
import { currentUserQueryHome } from "../lib/graphQL/queries";
import { branch, renderComponent } from "recompose";

const enhance = branch(
  ({ data }) => data.currentUser == null && data.loading,
  renderComponent(ActivityIndicator)
);

const Home = ({ data, navigation }) => (
  
    <View style={{ flex: 1, backgroundColor: "hsl(0, 0%, 96%)" }}>
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
            paddingTop: 15,
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
            onPress={() => navigation.navigate("Record")}
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
            onPress={() => navigation.navigate("Record")}
          />
        </View>
      </ScrollView>
    </View>
);

export default graphql(currentUserQueryHome)(enhance(Home));
