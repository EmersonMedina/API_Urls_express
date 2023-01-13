import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ userId: req.userId });

    res.json({ links });
  } catch (error) {
    res.status(500).json({ message: "Error in server" });
  }
};

export const getLink = async (req, res) => {
  try {
    const id = req.params.id;

    const link = await Link.findById(id).where({ userId: req.userId });

    console.log(link);

    if (!link) return res.status(404).json({ message: "Link not found" });

    res.json({ link });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(403).json({ message: "Invalid id" });

    res.status(500).json({ message: "Error in server" });
  }
};

export const getLongLink = async (req, res) => {
  try {
    const nanoLink = req.params.id;

    const link = await Link.findOne({ nanoLink });

    if (!link) return res.status(404).json({ message: "Link not found" });

    res.json({ longLink: link.longLink });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(403).json({ message: "Invalid id" });

    res.status(500).json({ message: "Error in server" });
  }
};

export const createLink = async (req, res) => {
  const { longLink } = req.body;

  try {
    const link = new Link({
      longLink,
      nanoLink: nanoid(6),
      userId: req.userId,
    });

    const newLink = await link.save();

    res.status(201).json({ newLink });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in server" });
  }
};

//TODO
export const UpdateLink = async (req, res) => {
  try {
    const id = req.params.id;
    const { longLink } = req.body;

    const link = await Link.findById(id).where({ userId: req.userId });

    if (!link) return res.status(404).json({ message: "Link not found" });

    link.longLink = longLink;

    await link.save();

    res.json({ link });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(403).json({ message: "Invalid id" });

    res.status(500).json({ message: "Error in server" });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const id = req.params.id;

    const link = await Link.findById(id).where({ userId: req.userId });

    if (!link) return res.status(404).json({ message: "Link not found" });

    await link.remove();

    res.json({ link });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(403).json({ message: "Invalid id" });

    res.status(500).json({ message: "Error in server" });
  }
};
