import { useState } from 'react'
import axios from 'axios'

export default function Editor({ goHome }) {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function uploadImageToImgur(file) {
    const clientId = import.meta.env.VITE_IMGUR_CLIENT_ID
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await axios.post('https://api.imgur.com/3/image', formData, {
        headers: {
          Authorization: `Client-ID ${clientId}`,
          Accept: 'application/json',
        },
      })
      return res.data.data.link
    } catch (e) {
      return null
    }
  }

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      if (!file) {
        setMsg('Please select an image file.')
        setLoading(false)
        return
      }
      const imageUrl = await uploadImageToImgur(file)
      if (!imageUrl) {
        setMsg('Image upload failed.')
        setLoading(false)
        return
      }

      // Fetch current products from JSONBin
      const binId = import.meta.env.VITE_JSONBIN_ID
      const masterKey = import.meta.env.VITE_JSONBIN_KEY
      const getRes = await axios.get(
        `https://api.jsonbin.io/v3/b/${binId}/latest`,
        { headers: { 'X-Master-Key': masterKey } }
      )
      const products = getRes.data.record.products || []

      // Add new product
      const newProduct = {
        id: Date.now(),
        name,
        description: desc,
        price,
        image: imageUrl,
      }
      products.push(newProduct)

      // Update JSONBin with new product list
      await axios.put(
        `https://api.jsonbin.io/v3/b/${binId}`,
        { products },
        { headers: { 'X-Master-Key': masterKey, 'Content-Type': 'application/json' } }
      )

      setName('')
      setDesc('')
      setPrice('')
      setFile(null)
      setMsg('Product added successfully! Go back to home to see it.')
    } catch (error) {
      setMsg('Failed to add product.')
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-xl mx-auto min-h-screen">
      <button
        onClick={goHome}
        className="mb-6 btn border-accent text-accent"
      >
        ← Back to Store
      </button>
      <h2 className="text-2xl font-oswald mb-4">Add New Product</h2>
      <form onSubmit={submit} className="space-y-4 bg-[#121212] p-6 rounded-lg">
        <input
          className="w-full p-3 rounded bg-[#222] text-gray-300"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
        />
        <textarea
          className="w-full p-3 rounded bg-[#222] text-gray-300"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          maxLength={200}
          rows={3}
        />
        <input
          className="w-full p-3 rounded bg-[#222] text-gray-300"
          type="text"
          placeholder="Price (optional)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          maxLength={20}
        />
        <input
          type="file"
          accept="image/*"
          onChange
