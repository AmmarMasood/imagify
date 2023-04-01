import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dhpispmtz",
  api_key: "698986335485711",
  api_secret: "6oQHx9n0i0yNt3Df5dh9yfcAAIM",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const base64String = req.body.img;
    try {
      const result = await cloudinary.v2.uploader.upload(base64String, {
        resource_type: "auto",
      });

      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
