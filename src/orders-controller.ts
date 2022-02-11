import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { readFile } from 'fs/promises';

import { schema } from './orders'

const ordersConnection = mongoose.createConnection('mongodb://localhost:27017/ordersdb')
const OrdersModel = ordersConnection.model('Orders', schema)

const seed = async (req: Request, res: Response) => {
    let orders = await readFile('./assets/MOCK_DATA_MATERIALS.json', 'utf-8')
    let ordersResult = await OrdersModel.insertMany(JSON.parse(orders))

    res.json({
        orders: {
          ids: ordersResult.map(t => t._id),
          cnt: ordersResult.length,
        }
      })
}

const list = async (req: Request, res: Response) => {
    const { src, dst, f, t } = req.query
  
    let filter = { }
  
    if(src) {
      filter = { src }
    }
  
    if(dst) {
      filter = { ...filter, dst }
    }
  
    if(f && t) {
      filter = { ...filter, ts: { $gt: f, $lt: t }}
    } else {
      if(f) {
        filter = { ...filter, ts: { $gt: f }}
      }
      if(t) {
        filter = { ...filter, ts: { $lt: t }}
      }
    }
    
    let result = await OrdersModel.find(filter, { __v: 0 }).lean()
    res.json(result);
  }
  
  const create =  async (req: Request, res: Response) => {
    let { id } = await new OrdersModel(req.body).save()
    res.json({ id })
  }
  
  const read = async (req: Request, res: Response) => {
    const { uid } = req.params
    let result = await OrdersModel.find({ _id: uid }, { __v: 0}).exec()
    res.json(result)
  }
  
  const overwrite = async (req: Request, res:Response) => {
    const { uid } = req.params
    const body = req.body
    let result = await OrdersModel.findOne({ _id: uid}, {__v: 0}).exec()
    if(result) {
      let resp = result.overwrite(body)
      res.json(resp)
    } else {
      res.sendStatus(404)
    }
  }
  
  const update = async (req: Request, res: Response) => {
    const { uid } = req.params
    console.log(uid)
    let result = await OrdersModel.updateOne({_id: uid }, { $set: { amnt: 100, src: '123', dst: '321' }}).exec()
    res.json({uid, result})
  }
  
  const remove = async (req: Request, res: Response) => {
  const { uid } = req.params
    let result = await OrdersModel.deleteOne({ _id: uid })
    res.json(result)
  }
  
  export const orders = {
    list, create, read, overwrite, update, remove, seed
  }