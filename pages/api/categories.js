import { Category } from "@/models/Category";
import { mongooseConnect } from "../lib/mongoose";
import { getServerSession } from "next-auth";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const { method } = req; 
  await mongooseConnect();
  await isAdminRequest(req, res)
  
  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
    const categoryDocument = await Category.create({ 
      name, 
      parent: parentCategory || undefined,
      properties: properties || undefined
    });
    res.json(categoryDocument)
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'))
  }

  if (method === 'PUT') {
    const { name, parentCategory, properties, _id } = req.body;
    const categoryDocument = await Category.updateOne({ _id }, {
       name, 
       parent: parentCategory || undefined,
       properties: properties || undefined
      });
    res.json(categoryDocument)
  }

  if (method === 'DELETE') {
    const { _id } = req.query
    await Category.deleteOne({ _id })
    res.json('ok')
  }

}