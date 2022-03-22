import { Router } from 'express'
import { URL } from 'url'

import lang from '../../src/defaultLang.js'
import Item from '../models/items.model.js'
import { BASE_URL } from '../config.js'

const router = Router()

router.route('/add').post(async (req, res) => {
  try {
    const { name, category, type, characteristics, specification, price, quantity, img } = req.body
    const id = Date.now()
    const candidate = await Item.findOne({ name })

    if (candidate) {
      return res.status(400).json({ message: lang.server.itemExists(item) })
    }

    const item = new Item({
      id,
      name,
      category,
      type,
      characteristics,
      specification,
      price,
      quantity,
      img,
    })

    await item.save()

    res.status(201).json({ message: { text: lang.server.itemCreated(item), type: 'info' } })
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/find').get(async (req, res) => {
  function ciEquals(a, b) {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'base', ignorePunctuation: true }) === 0
      : a === b
  }

  function compare(name, search) {
    let equal = false
    const arrName = name.split(' ')
    const arrSearch = search.split(' ')
    for (let wordInName of arrName) {
      for (let wordInSearch of arrSearch)
        if (ciEquals(wordInName, wordInSearch)) {
          equal = true
        }
    }
    return equal
  }

  function getMaxPrice(arr) {
    return arr.reduce((max, current) => {
      if (max <= +current.price) return +current.price
      return max
    }, +arr[0].price)
  }

  function getMinPrice(arr) {
    return arr.reduce((min, current) => {
      if (min <= +current.price) return min
      return +current.price
    }, +arr[0].price)
  }

  try {
    const url = new URL(req.url, BASE_URL)
    const limit = url.searchParams.get('_limit')
    const page = url.searchParams.get('_page')
    const searchString = url.searchParams.get('_searchString')
    const filterMinPrice = url.searchParams.get('_filterMinPrice')
    const filterMaxPrice = url.searchParams.get('_filterMaxPrice')
    const sortDirection = url.searchParams.get('_sortDirection')

    const items = await Item.find().sort({ price: +sortDirection })
    let searchList = items.filter((item) => compare(item.name, searchString))
    const maxPrice = getMaxPrice(searchList.length ? searchList : items)
    const minPrice = getMinPrice(searchList.length ? searchList : items)
    if (filterMinPrice) searchList = searchList.filter((item) => +item.price >= +filterMinPrice)
    if (filterMaxPrice) searchList = searchList.filter((item) => +item.price <= +filterMaxPrice)

    const start = (page - 1) * limit
    const end = page * limit
    const paginatedList = searchList.slice(start, end)

    return res
      .status(200)
      .json({ list: paginatedList, count: searchList.length, minPrice, maxPrice })
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/getwithpagination').get(async (req, res) => {
  try {
    const url = new URL(req.url, BASE_URL)
    const limit = +url.searchParams.get('_limit')
    const page = +url.searchParams.get('_page')
    const category = url.searchParams.get('_category')
    const type = url.searchParams.get('_type')
    const skip = page * limit
    const totalCount = await Item.find().countDocuments()

    let items = []
    if (!category && !type) items = await Item.find().skip(skip).limit(limit)
    else if (type) items = await Item.find({ type }).skip(skip).limit(limit)
    else if (category) items = await Item.find({ category }).skip(skip).limit(limit)

    return res.status(200).json({ items, totalCount })
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/getitemsfrombasket').post(async (req, res) => {
  try {
    const { itemsID } = req.body
    itemsID.sort((left, right) => {
      if (right < left) return 1
      if (right == left) return 0
      if (right > left) return -1
    })
    const basket = []
    for (let id of itemsID) {
      const item = await Item.findOne({ id })
      basket.push(item)
    }
    return res.status(201).json(basket)
  } catch (e) {
    return res.status(500).json({ message: { text: e.message, type: 'error' } })
  }
})

router.route('/').get(async (req, res) => {
  const items = await Item.find()
  return res.status(200).json(items)
})

export default router
