import { gql } from "apollo-boost";

export const workRiskQuery = gql`
  {
    records {
      id
    }
  }
`;

export const getAppointmentsQuery = gql`
  {
    appointments {
      id
      start
      end
      title
    }
  }
`;

export const addAppointmentMutation = gql`
  mutation(
    $title: String!
    $start: DateTime!
    $end: DateTime!
    $description: String
    $userId: ID!
  ) {
    addAppointment(
      title: $title
      start: $start
      end: $end
      description: $description
      userId: $userId
    ) {
      id
    }
  }
`;

export const updateAppointmentMutation = gql`
  mutation(
    $id: ID!
    $title: String
    $start: DateTime
    $end: DateTime
    $description: String
    $userId: ID
  ) {
    updateAppointment(
      id: $id
      title: $title
      start: $start
      end: $end
      description: $description
      userId: $userId
    ) {
      id
    }
  }
`;

export const updateDateTimeMutation = gql`
  mutation($id: ID!, $start: DateTime, $end: DateTime) {
    updateAppointmentDateTime(id: $id, start: $start, end: $end) {
      id
    }
  }
`;

export const deleteAppointmentMutation = gql`
  mutation($id: ID!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;
