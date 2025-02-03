import cors from "cors";
import express, { Express } from "express";
import { appConfig } from "./2-utils/app-config";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { bookController } from "./5-controllers/book-controller";
import { userController } from "./5-controllers/user-controller";
import helmet from "helmet";
import fileUpload from "express-fileupload";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { tagController } from "./5-controllers/tag-controller";
import { readingStatusController } from "./5-controllers/reading-status-controller";

class App {

    public server: Express; // Make server public for the testing.

    public start(): void {

        // Create the server: 
        this.server = express();

        // prevent problematic response header:
        this.server.use(helmet({ crossOriginResourcePolicy: false }));

        this.server.use(cors()); // Enabling CORS for any frontend address.

        // Tell express to create a request.body object from the body json:
        this.server.use(express.json());

        // Connect controllers to the server:
        this.server.use("/api", bookController.router, userController.router, tagController.router, readingStatusController.router);

        // tell express to create req.files obj from files sent by the front
        this.server.use(fileUpload());

        // connect file saver:
        const absolutePath = path.join(__dirname, "1-assets", "images");
        fileSaver.config(absolutePath);

        // Register route not found middleware: 
        this.server.use("*", errorMiddleware.routeNotFound);

        // Register catch-all middleware: 
        this.server.use(errorMiddleware.catchAll);

        this.server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
    }

}

export const app = new App(); // export app for the testing.
app.start();

