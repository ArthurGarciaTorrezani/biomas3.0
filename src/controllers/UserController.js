import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function userCreate(req, res) {
  try {
    const { adm, name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    let salt = bcrypt.genSaltSync(10);
    let password_hash = bcrypt.hashSync(password, salt);

    const usuario = await prisma.user.create({
      data: {
        isAdmin:adm,
        name,
        email,
        password:password_hash,
      },
    });

    return res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

export const userController = {
     userCreate,
   };
   