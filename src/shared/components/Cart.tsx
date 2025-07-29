import { CartContext } from '../states/CartContext';

export default function Cart() {
  return (
    // Consumer is the other way to consume react context other than useContext
    <CartContext.Consumer>
      {({ items, updateItemQuantity }:any) => {
          const totalPrice = items.reduce(
            (acc:any, item:any) => acc + item.price * item.quantity,
            0
          );
          const formattedTotalPrice = `$${parseFloat(totalPrice).toFixed(2)}`;
        return (
          <div>
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
              <ul>
                {items.map((item:any) => {
                  const formattedPrice = `$${parseFloat(item.price).toFixed(2)}`;

                  return (
                    <li key={item.imdbID}>
                      <div>
                        <span>{item.name}</span>
                        <span> ({formattedPrice})</span>
                      </div>
                      <div>
                        <button
                          onClick={() => updateItemQuantity(item.imdbID, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateItemQuantity(item.imdbID, 1)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <p>
              Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
}
