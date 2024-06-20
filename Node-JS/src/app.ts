
import express from "express"
import catchAll from "./3-middleware/catch-all"
import vacationControllers from "./6-controllers/vacationControllers";
import routeNotFound from "./3-middleware/routeNotFound";
import authControllers from "./6-controllers/authControllers";
import expressFileUpload from "express-fileupload"

import cors from "cors";
import sanitize from "./3-middleware/sanitize";



const server= express()

server.use(cors());

server.use('/vacations/images', express.static("./src/1-assets/images"));
server.use(express.json())

// integrate express-fileupload middleware to handle uploaded files:
server.use(expressFileUpload())

server.use(sanitize)

server.use("/api", vacationControllers )
server.use("/api", authControllers )

server.use("*", routeNotFound)



server.use(catchAll)

server.listen(3001, ()=>{
    console.log("Listening on port http://localhost:3001")
})