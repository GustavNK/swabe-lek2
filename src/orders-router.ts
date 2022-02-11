import { Router } from 'express'
import { orders } from './orders-controller'

const router = Router()

router.get('', orders.list)
router.post('', orders.create)
router.get('/:uid', orders.read)
router.put('/:uid', orders.overwrite)
router.patch('/:uid', orders.update)
router.delete('/:uid', orders.remove)
router.post('/seed', orders.seed)

export const Orders = router