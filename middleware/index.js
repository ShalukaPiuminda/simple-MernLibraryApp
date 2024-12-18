import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const setupmiddleware = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
};

export default setupmiddleware;
