import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'

export default function Home({ goEditor }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          'https://api.jsonbin.io/v3/b/YOUR_JSONBIN_ID/latest',
          {
            headers: { 'X-Master-Key': import.meta.env.VITE_JSONBIN_KEY },
          }
        )
        setProducts(res.data.record.products || [])
      } catch (e) {
        setProducts([])
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col min-h-screen">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-oswald">
          Ripped & Riot — <span className="text-accent">Underground</span>
        </h1>
        <button onClick={goEditor} className="btn border-accent text-accent">
          Admin Editor
        </button>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-grow">
        {products.length === 0 ? (
          <p className="text-muted text-center mt-20">No products yet.</p>
        ) : (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </main>
      <footer className="mt-10 text-center text-muted text-sm">
        Powered by JSONBin.io and Imgur
      </footer>
    </div>
  )
}
