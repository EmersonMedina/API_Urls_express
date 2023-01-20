import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase.js";
import { User } from "../models/User.js";
import sharp from "sharp";

export const updateUserProfile = async (req, res) => {
  try {
    if (req.hasError) {
      return res
        .status(400)
        .json({ mensaje: "Solamente se pueden cargar imágenes" });
    }

    const imagen = req.file;
    const { name } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (imagen) {
      //Redimensionar la imagen
      const resizedImage = await sharp(imagen.buffer)
        .resize(512, 512)
        .toBuffer();

      const metadata = {
        contentType: imagen.mimetype,
      };

      const storageRef = ref(storage, `userProfiles/${userId}`);
      await uploadBytes(storageRef, resizedImage, metadata);
      const photoURL = await getDownloadURL(storageRef);

      user.name = name;
      user.photoURL = photoURL;

      await user.save();

      return res.json({ email: user.email, name: user.name, photoURL });
    } else {
      user.name = name;
      await user.save();
      return res.json({
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: error.message });
  }
};
