import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs-extra";
import stream from "stream";

export default async function handler(req, res) {
  // Get the API key from the environment variable
  const STABILITY_API_KEY = process.env.DREAMSTUDIO_KEY;

  // Define the API endpoint
  const BASE_URL = "https://api.stability.ai";
  const URL = `${BASE_URL}/v1/generation/stable-diffusion-768-v2-1/image-to-image/masking`;

  // Create the form data payload
  const form = new FormData();
  const initImageBuffer = Buffer.from(
    req.body.image_url.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const initImageStream = stream.Readable.from(initImageBuffer);

  const maskImageBuffer = Buffer.from(
    req.body.mask.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const maskImageStream = stream.Readable.from(maskImageBuffer);
  form.append("init_image", initImageStream);
  form.append("mask_image", maskImageStream);
  form.append("mask_source", "MASK_IMAGE_WHITE");
  form.append("text_prompts[0][text]", req.body.prompt);
  form.append("text_prompts[0][weight]", 1);
  form.append("cfg_scale", req.body.cfg_scale);
  form.append("clip_guidance_preset", "FAST_BLUE");
  form.append("samples", 1);
  form.append("sampler", "K_DPM_2_ANCESTRAL");
  form.append("steps", req.body.steps);
  // Send the POST request
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        ...form.getHeaders(),
      },
      body: form,
    });
    const json = await response.json();

    // Save the response image to the file system
    console.log("checking", json);
    // Send the response back to the client
    res.json({
      imageUrl: `data:image/png;base64,${json.artifacts[0].base64}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
