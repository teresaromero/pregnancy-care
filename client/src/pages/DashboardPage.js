import React from "react";
import Calendar from "react-calendar";
import { Messages } from "../components/Messages";
import { AgendaView } from "fullcalendar";
import { Agenda } from "../components/Agenda";

export const DashboardPage = ({location,match}) => {
  console.log(match,location)
  return (
    <React.Fragment>
      <Messages />
      
      <p>dashboard</p>
      
    </React.Fragment>
  );
};
