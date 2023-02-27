import { Request, Response } from "express";
import db from "../db";


export const allUsers = async (req: Request, res: Response) => {
    try {
        let users = await db.any("select * from users where deleted_at is null");
        res.json({
            data: users,
            msg: "",
            success: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", success: false , err })
    }
}

export const getUser = async (req: Request, res: Response) => {
    let user_id = req.params.id;
    try {
        if (!user_id) return res.status(400).json({ msg: `Please send correct userId: ${user_id}`, success: false })
        let user = await db.oneOrNone("select * from users where id = ${user_id} and deleted_at is null", { user_id });
        console.log(user)
        if(!user) return res.status(400).json({ msg: `No user found with  userId: ${user_id}`, success: false })
        res.json({
            data: user,
            msg: user === null ? `No user found with id : ${user_id}` : "User Details",
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", success: false })
    }
}

export const addUsers = async (req: Request, res: Response) => {

    let { username, password } = req.body;
    try {
        if(!username || !password) return res.status(400).json({ msg: "Username / password is required", success: false })
        let ifExists = await db.any("select * from users where username = ${username}", { username, password });
        if (!ifExists) return res.status(400).json({ msg: "Username already exists", success: false })

        let users = await db.any("insert into users(username , password) values (${username} , ${password})", { username, password });
        res.json({
            data: users,
            success: true,
            msg: "User added successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", success: false, err })
    }
}

export const updateUsers = async (req: Request, res: Response) => {
    let user_id = req.params.id;
    let { username = "", password = "" } = req.body;
    let condition = "";
    if (username && username !== undefined) {
        condition += ", username=${username}";
    } else if (password && password !== "undefined") {
        condition += ", password=${password}";
    }
    try {
        let user = await db.any("select * from users where id = ${user_id} and deleted_at is null", { user_id });
        if (!user) return res.status(400).json({ msg: "Id does not exist or deleted", success: false })

        let users = await db.any("Update users set updated_at = now()" + condition + "where id = ${user_id}", { ...req.body, user_id });
        res.json({
            data: users,
            success: true,
            msg: "User updated successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", success: false, err })
    }
}
export const deleteUsers = async (req: Request, res: Response) => {
    let user_id = req.params.id;
    try {
        let user = await db.any("select * from users where id = ${user_id} and deleted_at is null", { user_id });
        console.log(!user)
        if (!user) return res.status(400).json({ msg: "Id already deleted", success: false })

        let users = await db.any("Update users set deleted_at = now() where id = ${user_id}", { user_id });
        res.json({
            data: users,
            success: true,
            msg: "User deleted Successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Something went wrong", success: false, err})
    }
}
