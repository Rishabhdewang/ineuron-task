
import { Router } from 'express';
import { allUsers, deleteUsers, updateUsers, getUser, addUsers } from "../controllers/user.controller";
// Init router and path
const route = Router();
// Add sub-routes
route.get("/users", allUsers);
route.get("/user/:id", getUser);
route.post("/add-user", addUsers);
route.put("/update-user/:id", updateUsers);
route.put("/delete-user/:id", deleteUsers);

export default route;
