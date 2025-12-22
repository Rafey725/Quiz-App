import { Router } from "express";
import { validataInfo } from "../middlewares/validateInfo.ts";
import { db } from "../db.ts";
import { users } from "../schemas/userSchema.ts";
import { eq } from "drizzle-orm";

const router = Router()

router.post('/signup', validataInfo, async (req, res) => {
    let find = await db
        .select()
        .from(users)
        .where(eq(users.email, req.body.email))

    console.log(find);


    res.json({ message: 'Registered new user' })
})

export default router