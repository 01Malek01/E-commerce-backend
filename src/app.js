import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { errorHandler, middleware } from "supertokens-node/framework/express";
import User from "./models/UserModel.js";
import productRouter from "./routes/ProductRoutes.js";
import globalErrorHandler from "./middleware/GlobalErrorHandler.js";
import orderRouter from "./routes/OrderRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../../back-end/.env"),
});

const app = express();

//initialize superTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPER_TOKENS_URI,
    apiKey: process.env.SUPER_TOKENS_API_KEY,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: "E-Commerce",
    apiDomain: process.env.BACKEND_URL,
    websiteDomain: process.env.FRONTEND_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      override: {
        functions: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUp: async function (input) {
              // First we call the original implementation of signUp.
              let response = await originalImplementation.signUp(input);

              // Post sign up response, we check if it was successful
              if (response.status === "OK") {
                // If it was successful, we get the user from the response object
                let user = response.user;
                const newUser = await User.create({
                  email: user.emails[0],
                  superTokenId: user.id,
                });
                /**
                 *
                 * response.user contains the following info:
                 * - emails
                 * - id
                 * - timeJoined
                 * - tenantIds
                 * - phone numbers
                 * - third party login info
                 * - all the login methods associated with this user.
                 * - information about if the user's email is verified or not.
                 *
                 */
              }
              return response;
            },
            signIn: async function (input) {
              // First we call the original implementation of signIn.
              let response = await originalImplementation.signIn(input);

              // Post sign in response, we check if it was successful
              if (response.status === "OK") {
                // If it was successful, we get the user from the response object
                let user = response.user;
                /**
                 *
                 * response.user contains the following info:
                 * - emails
                 * - id
                 * - timeJoined
                 * - tenantIds
                 * - phone numbers
                 * - third party login info
                 * - all the login methods associated with this user.
                 * - information about if the user's email is verified or not.
                 *
                 */
                // TODO: post sign in logic
              }
              return response;
            },
          };
        },
      },
    }),
    Session.init({
      cookieSecure: process.env.NODE_ENV === "production", // true only in production
    }), // initializes session features
  ],
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true, // Enable cookies for cross-domain requests
  })
);

// IMPORTANT: CORS should be before the below line.
app.use(middleware());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user", userRoutes);
app.use(errorHandler());
app.use(globalErrorHandler);

export default app;
