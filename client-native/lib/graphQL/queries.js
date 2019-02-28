import { gql } from "apollo-boost";

export const currentUserQueryHome = gql`
  {
    currentUser {
      name
      record {
        LMP
        EDC
      }
    }
  }
`;

export const currentUserQueryProfile = gql`
  {
    currentUser {
      name
      surname
      email
      phone
      image
      bornDate
     
    }
  }
`;

export const currentUserQueryRecord = gql`
  {
    currentUser {
      record {
        height
        weight {
          value
          date
        }
        IMC {
          value
          date
        }
        bloodPressure {
          Systolic
          Diastolic
          date
        }
      }
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

export const getPatientQuery = gql`
  query($id: ID!) {
    patient(id: $id) {
      name
      surname
      record {
        LMP
      }
    }
  }
`;

export const addAppointmentMutation = gql`
  mutation(
    $title: String!
    $start: DateTime!
    $end: DateTime!
    $description: String!
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
