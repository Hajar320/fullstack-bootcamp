""" Products routes """

from flask import Blueprint, render_template, request, redirect, url_for, flash
from database.connection import get_db_connection as connect_db


menu_items_bp = Blueprint("menu_items", __name__)


@menu_items_bp.route("/")
def get_menu_items():
    """ Index route """

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM menu_items ORDER BY item_id ASC")
    rows = cursor.fetchall()

    # Manually convert to list of dicts
    menu_items = [
        {
            'item_id': row[0],
            'item_name': row[1],
            'item_price': row[2]
        }
        for row in rows
    ]

    conn.close()

    return render_template("index.html", menu_items=menu_items)


@menu_items_bp.route("/add", methods=["GET"])
def show_add_form():
    """ Show the add item form """
    return render_template('item_create.html')

@menu_items_bp.route("/add", methods=["POST"])
def create_item():
    """Create a item"""
    data = request.form
    conn = connect_db()
    cursor = conn.cursor()

    values = (
        data.get("item_name"),
        data.get("item_price"),
    )

    query = """
        INSERT INTO menu_items (item_name, item_price)
        VALUES (%s, %s)
        RETURNING item_id
    """

    cursor.execute(query, values)
    conn.commit()
    item = cursor.fetchone()
    conn.close()

    return redirect(url_for("menu_items.get_menu_items"))


@menu_items_bp.route("/edit/<int:item_id>", methods=["GET"])
def show_edit_form(item_id):
    """ Show the edit form with current item data """
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM menu_items WHERE item_id = %s", (item_id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return "Item not found", 404

    item = {
        'item_id': row[0],
        'item_name': row[1],
        'item_price': row[2]
    }

    return render_template("item_edit.html", item=item)


@menu_items_bp.route("/edit/<int:item_id>", methods=["POST"])
def update_item(item_id):
    """ Handle form submission to update the item """
    data = request.form
    item_name = data.get("item_name")
    item_price = data.get("item_price")

    conn = connect_db()
    try:
        cursor = conn.cursor()
        query = """
            UPDATE menu_items
            SET item_name = %s, item_price = %s
            WHERE item_id = %s
        """
        cursor.execute(query, (item_name, float(item_price), item_id))
        conn.commit()
        flash("Item updated successfully!", "success")
        return redirect(url_for("menu_items.get_menu_items"))
    except Exception as e:
        conn.rollback()
        return f"Error updating item: {e}", 500
    finally:
        cursor.close()
        conn.close()


@menu_items_bp.route("/delete/<int:item_id>", methods=["GET"])
def show_delete_confirmation(item_id):
    """ Show a confirmation page before deleting an item """
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM menu_items WHERE item_id = %s", (item_id,))
    row = cursor.fetchone()
    conn.close()

    if row is None:
        return "Item not found", 404

    item = {
        'item_id': row[0],
        'item_name': row[1],
        'item_price': row[2]
    }

    return render_template("item_delete.html", item=item)

@menu_items_bp.route("/delete/<int:item_id>", methods=["POST"])
def delete_item(item_id):
    """ Delete a menu item and show confirmation """
    conn = connect_db()
    cursor = conn.cursor()

    # Fetch item details before deletion
    cursor.execute("SELECT item_name, item_price FROM menu_items WHERE item_id = %s", (item_id,))
    row = cursor.fetchone()

    if row is None:
        conn.close()
        return "Item not found", 404

    item_name, item_price = row

    try:
        cursor.execute("DELETE FROM menu_items WHERE item_id = %s", (item_id,))
        conn.commit()
    except Exception as e:
        conn.rollback()
        conn.close()
        flash(f"Error deleting item: {e}", "error")
        return redirect(url_for("menu_items.get_menu_items"))

    conn.close()

    # Pass the deleted item info to the confirmation page
    return render_template("item_delete.html", item_name=item_name, item_price=item_price)
