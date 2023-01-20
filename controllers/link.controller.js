import { Link } from "../models/Link.js";
import { nanoid } from "nanoid";

export const getLinks = async (req, res) => {
  try {
    const { startIn, quantity } = req.params;

    const links = await Link.find({ userId: req.userId })
      .skip(startIn)
      .limit(quantity);

    const totalLinks = await Link.count({ userId: req.userId });

    res.json({ links, totalLinks });
  } catch (error) {
    res.status(500).json({ message: "Error in server" });
  }
};

export const getFilteredLinks = async (req, res) => {
  try {
    const filterValue = req.params.filterValue;

    const queryName = {
      name: { $regex: ".*" + filterValue + ".*", $options: "i" },
    };

    const queryLongLink = {
      longLink: { $regex: ".*" + filterValue + ".*", $options: "i" },
    };

    const links = await Link.find({ userId: req.userId }).or([
      queryName,
      queryLongLink,
    ]);

    if (!links) return res.status(404).json({ error: "Not Found" });

    const totalLinks = links.length;

    res.json({ links, totalLinks });
  } catch (error) {
    res.status(500).json({ message: "Error in server" });
  }
};

export const getLink = async (req, res) => {
  try {
    const id = req.params.id;

    const link = await Link.findById(id).where({ userId: req.userId });

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
  const { longLink, name } = req.body;

  try {
    const link = new Link({
      name,
      longLink,
      nanoLink: nanoid(6),
      userId: req.userId,
    });

    const newLink = await link.save();

    const totalLinks = await Link.count({ userId: req.userId });

    res.status(201).json({ newLink, totalLinks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in server" });
  }
};

//TODO
export const UpdateLink = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, longLink } = req.body;

    const link = await Link.findById(id).where({ userId: req.userId });

    if (!link) return res.status(404).json({ message: "Link not found" });

    link.longLink = longLink;
    link.name = name;

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

    const totalLinks = await Link.count({ userId: req.userId });

    res.json({ link, totalLinks });
  } catch (error) {
    console.log(error);

    if (error.kind === "ObjectId")
      return res.status(403).json({ message: "Invalid id" });

    res.status(500).json({ message: "Error in server" });
  }
};
