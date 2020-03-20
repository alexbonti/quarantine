


export const contractType = type => {
  switch (type) {
    case "Initiated":
      return status.initiated;
    case "Cancelled":
      return status.cancelled;
    case "Awaiting my Signature":
      return status.waitingMySignature;
    case "Awaiting Signatures":
      return status.waitingOtherSignatures;
      case "Processing Termination":
        return status.initiated;
        case "Completed":
        return status.initiated;
    default:
      break;
  }
};

export const requestType = type => {
  switch (type) {
    case "TERMINATE":
      return actions.terminate;
    case "MAINTENANCE":
      return actions.maintenance;
    case "COMPLAIN":
      return actions.complain;
    case "COMPLETED":
      return actions.completed;
      case "QUERY":
      return actions.query;
    default:
      break;
  }
};

export const contractStatus = statusList => {

  let statusConfiguration = {};

  statusList.map(item => {
    if (item.actionName === "COMPLAIN") {

      return (statusConfiguration.complain = {
        actionId: item._id,
        rules: item.rules,
        dataStructure: item.keysRequired,
        contractRegualator: item.critical
      });
    } else if (item.actionName === "MAINTENANCE") {
      return (statusConfiguration.maintenance = {
        actionId: item._id,
        rules: item.rules,
        dataStructure: item.keysRequired,
        contractRegualator: item.critical

      });
    } else if (item.actionName === "TERMINATE") {
      return (statusConfiguration.terminate = {
        actionId: item._id,
        rules: item.rules,
        dataStructure: item.keysRequired,
        contractRegualator: item.critical

      });
    } else if (item.actionName === "QUERY") {
      return (statusConfiguration.query = {
        actionId: item._id,
        rules: item.rules,
        dataStructure: item.keysRequired,
        contractRegulator: item.critical

      });
    } else {
      return null;
    }
  });
  return statusConfiguration;
};

const status = {
  cancelled: {
    badgeColor: "danger",
    buttonSign: false,
    buttonCancel: false,
    badgeTitle: "Cancelled"
  },
  waitingMySignature: {
    badgeColor: "warning",
    buttonSign: true,
    buttonCancel: true,
    badgeTitle: "Awaiting my Signature"
  },
  waitingOtherSignatures: {
    badgeColor: "warning",
    buttonSign: false,
    buttonCancel: true,
    badgeTitle: "Awaiting Signatures"
  },
  initiated: {
    badgeColor: "success",
    buttonSign: false,
    buttonCancel: false,
    badgeTitle: "Signed"
  },
  terminated: {
    badgeColor: "warning",
    buttonSign: false,
    buttonCancel: false,
    badgeTitle: "processing termination"
  }
};

const actions = {
  terminate: {
    badgeColor: "danger",
    badgeTitle: "TERMINATE",
    buttonAccept: true,
    buttonOther: true
  },
  maintenance: {
    badgeColor: "info",
    badgeTitle: "MAINTENAINCE",
    buttonAccept: true,
    buttonOther: true
  },
  complain: {
    badgeColor: "warning",
    badgeTitle: "COMPLAIN",
    buttonAccept: true,
    buttonOther: true
  },
  completed: {
    badgeColor: "success",
    badgeTitle: "COMPLETED",
    buttonAccept: false,
    buttonOther: false
  },
   query: {
    badgeColor: "info",
    badgeTitle: "QUERY",
    buttonAccept: false,
    buttonOther: false
  }
};
