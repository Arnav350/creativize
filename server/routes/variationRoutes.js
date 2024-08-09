import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import streamifier from "streamifier";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Variation");
});

router.route("/").post(async (req, res) => {
  try {
    const { photo } = req.body;

    const base64Data = photo.substring(23);
    const imgBuffer = Buffer.from(base64Data, "base64");
    const imgStream = streamifier.createReadStream(imgBuffer);

    const response = await openai.images.createVariation({
      image: imgStream,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = response.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
