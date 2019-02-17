import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";

const _Home = ({ user }) => (
  <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card>
        <Text>Hola</Text>
        
      </Card>
    </ScrollView>
  </View>
);
export default (Home = connect(store => ({ user: store.user }))(_Home));
