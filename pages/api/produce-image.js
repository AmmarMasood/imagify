// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const banana = require("@banana-dev/banana-dev");

const apiKey = "6a2a5f57-105c-4a97-b382-cf8a37a50b75";
const modelKey = "826c839e-2ba3-4ba4-964e-3cea67d0bfba";

const getModalInputs = (body) => {
  if (body.endpoint === "txt2img") {
    return {
      endpoint: "txt2img",
      params: {
        prompt: body.prompt,
        negative_prompt: body.negativePrompt,
        steps: body.steps,
        sampler_name: "DDIM",
        cfg_scale: body.cfg_scale,
        seed: body.seed,
        // batch_size: 1,
        n_iter: 1,
        // width: 768,
        // height: 768,
        tiling: false,
      },
    };
  } else {
    return {
      endpoint: "img2img",
      params: {
        prompt: body.prompt,
        init_images: body.initImage,
        // negative_prompt: body.negativePrompt,
        steps: body.steps,
        sampler_name: "DDIM",
        cfg_scale: body.cfg_scale,
        seed: body.seed,
        //   negative_prompt: "cartoonish, low quality",
        //   steps: 25,
        //   sampler_name: "Euler a",
        //   cfg_scale: 7.5,
        //   seed: 42,
        //   batch_size: 1,
        n_iter: 1,
        //   width: 768,
        //   height: 768,
        //   tiling: false,
      },
    };
  }
};

const handleBananaDevRequest = async (body) => {
  try {
    const res = await banana.run(apiKey, modelKey, getModalInputs(body));
    return res;
  } catch (err) {
    throw err;
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const bananaRes = await handleBananaDevRequest(req.body);
      if (bananaRes.modelOutputs.length > 0) {
        console.log("ammar", bananaRes);
        res.status(200).json({
          imageUrl: `data:image/png;base64,${bananaRes.modelOutputs[0]?.images[0]}`,
          message: bananaRes.message,
          createdAt: bananaRes.created,
          apiVersion: bananaRes.apiVersion,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Error from server" });
    }
  }
}
