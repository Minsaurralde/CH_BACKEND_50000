import {
  MONGO_CLUSTER,
  MONGO_PASSWORD,
  MONGO_USER,
} from "../../../constants/environments.js";

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.1vtqohs.mongodb.net/?retryWrites=true&w=majority`;

export default uri;
