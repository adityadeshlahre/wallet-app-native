import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = process.env.API_PORT;

app.use(cors());
app.use(bodyParser.json());

import prisma from "@repo/database";

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.post("/user", async (req: Request, res: Response) => {
  const { username, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.put("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
      },
    });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

app.put("/user/:id/activate", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
    res.json({ message: "User activated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error activating user" });
  }
});

app.put("/user/:id/deactivate", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    res.json({ message: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error deactivating user" });
  }
});

app.post("/wallet", async (req: Request, res: Response) => {
  const { userId, balance } = req.body;
  try {
    const wallet = await prisma.wallet.create({
      data: {
        userId,
        balance,
      },
    });
    res.json({ wallet });
  } catch (error) {
    res.status(500).json({ error: "Error creating wallet" });
  }
});

app.get("/wallet/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id },
    });
    if (wallet) {
      res.json({ wallet });
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching wallet" });
  }
});

app.put("/wallet/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { balance } = req.body;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: {
        balance,
      },
    });
    res.json({ wallet });
  } catch (error) {
    res.status(500).json({ error: "Error updating wallet" });
  }
});

app.delete("/wallet/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.delete({
      where: { id },
    });
    res.json({ message: "Wallet deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting wallet" });
  }
});

app.put("/wallet/:id/freeze", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { isFrozen: true }, // Freeze wallet
    });
    res.json({ message: "Wallet frozen successfully", wallet });
  } catch (error) {
    res.status(500).json({ error: "Error freezing wallet" });
  }
});

app.put("/wallet/:id/unfreeze", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { isFrozen: false }, // Unfreeze wallet
    });
    res.json({ message: "Wallet unfrozen successfully", wallet });
  } catch (error) {
    res.status(500).json({ error: "Error unfreezing wallet" });
  }
});

app.post("/transaction", async (req: Request, res: Response) => {
  const { walletId, amount, type } = req.body;
  try {
    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        amount,
        type,
      },
    });
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ error: "Error creating transaction" });
  }
});

app.get("/transaction/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (transaction) {
      res.json({ transaction });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching transaction" });
  }
});

app.get(
  "/transactions/wallet/:walletId",
  async (req: Request, res: Response) => {
    const { walletId } = req.params;
    try {
      const transactions = await prisma.transaction.findMany({
        where: { walletId },
      });
      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions" });
    }
  },
);

app.delete("/transaction/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.delete({
      where: { id },
    });
    res.json({ message: "Transaction deleted successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: "Error deleting transaction" });
  }
});

// ADMIN

app.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        wallets: true,
      },
    });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/admin/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        wallets: true,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user details" });
  }
});

app.put("/admin/user/:id/activate", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
    res.json({ message: "User activated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error activating user" });
  }
});

app.put("/admin/user/:id/deactivate", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    res.json({ message: "User deactivated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error deactivating user" });
  }
});

app.put("/admin/wallet/:id/freeze", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { isFrozen: true },
    });
    res.json({ message: "Wallet frozen successfully", wallet });
  } catch (error) {
    res.status(500).json({ error: "Error freezing wallet" });
  }
});

app.put("/admin/wallet/:id/unfreeze", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.update({
      where: { id },
      data: { isFrozen: false },
    });
    res.json({ message: "Wallet unfrozen successfully", wallet });
  } catch (error) {
    res.status(500).json({ error: "Error unfreezing wallet" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
