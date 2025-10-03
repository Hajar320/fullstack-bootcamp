-- 1. Create the users table (Bonus)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- 2. Create the product_orders table
CREATE TABLE product_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES product_orders(id),
    name VARCHAR(100),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0)
);

-- Function to calculate total price for an order
CREATE OR REPLACE FUNCTION get_order_total(order_id_i INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(price * quantity)
    INTO total
    FROM items
    WHERE order_id = order_id_i;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;


-- Function to get total for a given order that belongs to a specific user
CREATE OR REPLACE FUNCTION get_user_order_total(user_id_i INT, order_id_i INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(i.price * i.quantity)
    INTO total
    FROM items i
    JOIN product_orders po ON po.id = i.order_id
    WHERE po.id = order_id_i AND po.user_id = user_id_i;

    RETURN COALESCE(total, 0);
END;
$$ LANGUAGE plpgsql;


INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Lee', 'charlie@example.com');

INSERT INTO product_orders (user_id, order_date) VALUES
(1, '2025-10-01 10:00:00'),
(1, '2025-10-02 14:30:00'),
(2, '2025-10-03 09:15:00');

INSERT INTO items (order_id, name, quantity, price) VALUES
(1, 'Laptop', 1, 999.99),
(1, 'Mouse', 2, 25.50),
(2, 'Keyboard', 1, 75.00),
(3, 'Monitor', 2, 150.00),
(3, 'HDMI Cable', 3, 10.00);


SELECT get_order_total(1);                -- Total for order with ID = 1
SELECT get_user_order_total(2, 1);        -- Total for order ID = 1 that belongs to user ID = 2
