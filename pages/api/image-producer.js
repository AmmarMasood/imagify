// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const banana = require("@banana-dev/banana-dev");

const apiKey = "6a2a5f57-105c-4a97-b382-cf8a37a50b75";

const handlePix2PixRequest = async (body) => {
  const modelKey = "98a9659e-a063-4bc2-ae7e-519bf1392a69";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      image_url: body.image_url,
      seed: 392030,
      guidance_scale: 7.5,
      image_guidance_scale: 1.5,
    });
    return res;
  } catch (err) {
    console.log("err: ", err);
    throw err;
  }
};

const handleTxt2ImgRequest = async (body) => {
  const modelKey = "826c839e-2ba3-4ba4-964e-3cea67d0bfba";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      negative_prompt: body.negativePrompt,
      steps: body.steps,
      sampler_name: "DDIM",
      cfg_scale: body.cfg_scale,
      seed: body.seed,
      // batch_size: 1,
      n_iter: 1,
      width: 640,
      height: 640,
      tiling: false,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const handleImg2ImgRequest = async (body) => {
  const modelKey = "826c839e-2ba3-4ba4-964e-3cea67d0bfba";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      init_images: body.image_url,
      // negative_prompt: body.negativePrompt,
      steps: body.steps,
      sampler_name: "DDIM",
      cfg_scale: body.cfg_scale,
      seed: body.seed,
      mask: body.mask,
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
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const handleControlnetRequest = async (body) => {
  const modelKey = "b0ad4ea0-e2af-4850-8ffb-4fc8100b7e69";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      negative_prompt: body.negativePrompt,
      image_data: body.image_url || "",
      num_inference_steps: body.steps,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const handleDreamlikeRequest = async (body) => {
  const modelKey = "30431a4f-a07b-4820-a3fd-c0a0ddcb25ea";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      negative_prompt: body.negativePrompt,
      num_inference_steps: body.steps,
      guidance_scale: body.cfg_scale,
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const handleImg2ImgWithMask = async (body) => {
  const modelKey = "922fb813-ba5e-4d20-b41c-2fc183720d69";
  try {
    const res = await banana.run(apiKey, modelKey, {
      prompt: body.prompt,
      init_image:
        "https://res.cloudinary.com/dhpispmtz/image/upload/v1681336773/mh4ryu01nxf83q2ggbhx.jpg",
      negative_prompt: "",
      steps: body.steps,
      sampler_name: "K_EULER_ANCESTRAL",
      guidance_scale: body.cfg_scale,
      // cfg_scale: body.cfg_scale,
      // seed: body.seed,
      mask: "https://res.cloudinary.com/dhpispmtz/image/upload/v1681336773/mh4ryu01nxf83q2ggbhx.jpg",
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
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const handleBananaDevRequest = async (value) => {
  try {
    if (value.type === "txt2img") {
      const res = await handleTxt2ImgRequest(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].base64_output;
      } else {
        return false;
      }
    }
    if (value.type === "img2img") {
      const res = await handleImg2ImgRequest(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].base64_output;
      } else {
        return false;
      }
    }
    if (value.type === "pix2pix") {
      const res = await handlePix2PixRequest(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].image_base64;
      } else {
        return false;
      }
    }
    if (value.type === "controlnet") {
      const res = await handleControlnetRequest(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].base64_output;
      } else {
        return false;
      }
    }
    if (value.type === "dreamlike") {
      const res = await handleDreamlikeRequest(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].image_base64;
      } else {
        return false;
      }
    }
    if (value.type === "img2img_mask") {
      const res = await handleImg2ImgWithMask(value);
      if (res?.modelOutputs.length > 0) {
        return res.modelOutputs[0].image_base64;
      } else {
        return false;
      }
    }
  } catch (err) {
    throw err;
  }
};
export default async function handler(req, res) {
  if (req.method === "POST") {
    const bananaRes = await handleBananaDevRequest(req.body);

    if (bananaRes) {
      return res.status(200).json({
        imageUrl: `data:image/png;base64,${bananaRes}`,
      });
    } else {
      res
        .status(400)
        .json({ error: "Error when making request to bananadev server" });
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
