import { gql } from "apollo-boost";

export const currentUserApp = gql`
  query currentUser {
    currentUser {
      id
    }
  }
`;

export const currentUserQueryHome = gql`
  {
    currentUser {
      id
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
      id
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
      id
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
