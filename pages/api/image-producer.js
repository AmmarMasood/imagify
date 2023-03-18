// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const banana = require("@banana-dev/banana-dev");

const apiKey = "6a2a5f57-105c-4a97-b382-cf8a37a50b75";
const modelKey = "e6c18ff0-f759-44a0-a2c0-73c9dc6310dd";

const handleBananaDevRequest = async (value) => {
  try {
    const res = await banana.run(apiKey, modelKey, { prompt: value.prompt });
    return res;
  } catch (err) {
    console.log("err: ", err);
  }
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const bananaRes = await handleBananaDevRequest(req.body);
    if (bananaRes?.modelOutputs.length > 0) {
      res.status(200).json({
        imageUrl: `data:image/png;base64,${bananaRes.modelOutputs[0].image_base64}`,
        message: bananaRes.message,
        createdAt: bananaRes.created,
        apiVersion: bananaRes.apiVersion,
      });
    } else {
      res
        .status(400)
        .json({ error: "Error when making request to bananadev server" });
    }
  }
}
