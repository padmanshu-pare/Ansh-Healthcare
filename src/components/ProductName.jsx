export default function ProductName({ product, className = '' }) {
    if (!product) return null;
    return (
        <span className={`product-name-colored ${className}`}>
            {(product.nameParts || [{ text: product.name, color: 'currentColor' }]).map((part, index) => (
                <span key={index} style={{ color: part.color }}>{part.text}</span>
            ))}
        </span>
    );
}
