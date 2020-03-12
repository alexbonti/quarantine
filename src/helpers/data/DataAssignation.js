import Fingerprint from "@material-ui/icons/Fingerprint";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import FaceIcon from "@material-ui/icons/Face";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';

export const typeAgginator = data => {
  switch (data) {
    case "CREATED":
      return "warning";
    case "DENIED":
      return "danger";
    case "SIGNED":
      return "info";
    case "INITIATED":
      return "success";
    case "TERMINATE":
      return "danger";
      case "FAILATTEMPT":
      return "danger";
      case "PROCESSING":
      return "warning";
      case "QUERY":
      return "info";
    default:
      break;
  }
};

export const iconAssignator = data => {
  switch (data) {
    case "CREATED":
      return FiberNewIcon;
    case "DENIED":
      return NotInterestedIcon;
    case "SIGNED":
      return Fingerprint;
    case "INITIATED":
      return DoneAllIcon;
      case "USER":
        return FaceIcon;
        case "FAILATTEMPT":
      return ErrorOutlineIcon;
      case "PROCESSING":
      return HistoryOutlinedIcon;
      case "QUERY":
      return HistoryOutlinedIcon;
    default:
      break;
  }
};
