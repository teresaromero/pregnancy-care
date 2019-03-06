import { gql } from "apollo-boost";

export const currentUserApp = gql`
  {
    currentUser {
      id
    }
  }
`;

export const currentUserCalendar = gql`
  {
    currentUser {
      id
      record {
        LMP
        EDC
      }
      appointments {
        id
        start
        end
        description
      }
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

export const currentUserQueryInformation = gql`
  {
    currentUser {
      id
      record {
        bloodGroup
        rh
        pregnancyType
        risk
        visits {
          date
          notesOut
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
