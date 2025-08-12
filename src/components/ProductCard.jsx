export default function ProductCard({ product }) {
  return (
    <div className="bg-[#121212] rounded-lg shadow-lg overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-oswald text-xl mb-2">{product.name}</h3>
        <p className="text-sm text-muted flex-grow">{product.description}</p>
        {product.price && (
          <p className="mt-4 font-semibold text-accent">{product.price}</p>
        )}
      </div>
    </div>
  )
}
