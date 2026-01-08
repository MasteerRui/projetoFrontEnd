import type { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
      <img src={item.image} alt={item.title} width={100} />
      <h4>{item.title}</h4>
      <p>Preço: ${item.price.toFixed(2)}</p>
      <p>
        Quantidade:
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
          style={{ width: 50, marginLeft: 5 }}
        />
      </p>
      <button onClick={() => onRemove(item.id)}>Remover</button>
    </div>
  );
}