import Thread from "../models/Thread.js";
import express from "express";
import getgrogAIAPIResponse from "../utils/grog.js";
const router = express.Router();

router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "ddsf",
      title: "oksfgoisdhgsoidgh",
    });
    const respose = await thread.save();
    res.send(respose);
  } catch (err) {
    console.log(err);
  }
});

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "unable the fetch the data" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "thread not found" });
    }
    res.json(thread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "unable the fetch the chat" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const threadDeleted = await Thread.findOneAndDelete({ threadId });
    if (!threadDeleted) {
      res.status(404).json({ error: "thread not found" });
    }
    res.status(200).json({ succes: "thread deleted succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete thread" });
  }
});

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    res.status(404).json({ error: "Missing required fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }
    const assistantReply = await getgrogAIAPIResponse(message);

    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();

    await thread.save();
    res.json({ replay: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
