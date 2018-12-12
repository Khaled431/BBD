from sqlalchemy import create_engine
from sqlalchemy import sql

from BarBeerDrinker import config

engine = create_engine(config.database_uri)


def get_bars():
    with engine.connect() as con:
        rs = con.execute("SELECT name, city, phone_number, owner_first, owner_last FROM bars;")
        return [dict(row) for row in rs]


def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT name, city, phone_number, owner_first, owner_last FROM bars WHERE name = :name;"
        )

        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)


def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM inventory WHERE item_cost < :max_price AND item_name in (SELECT name from beers);"
        )

        rs = con.execute(query, max_price=max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['item_cost'] = float(r['item_cost'])
        return results


def get_bar_selection(bar_name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT \
                bar.name, \
                inv.item_name, \
                inv.item_cost, \
                COALESCE(liked.like_count, 0) AS likes \
            FROM\
                bars bar,\
                inventory inv,\
                (SELECT \
                    item_name, COUNT(*) AS like_count \
                FROM \
                likes \
                GROUP BY item_name) AS liked \
            WHERE\
                bar.name = :bar_name \
            LIMIT 100")
        rs = con.execute(query, bar_name=bar_name)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['item_cost'] = float(results[i]['item_cost'])
        return results


def get_bars_inventory(beer):
    with engine.connect() as con:
        query = sql.text("SELECT \
                            bar.name as bar, item.item_count, item.item_cost as item_cost, likes.num_transactions\
                          FROM\
                            bars AS bar,\
                            inventory AS item,\
                            (SELECT \
                                COUNT(f.bar_name) AS num_transactions, f.bar_name AS bar_name\
                             FROM\
                                transactions f\
                            WHERE\
                                f.item_name = :beer \
                            GROUP BY f.bar_name) AS likes\
                          WHERE\
                            item.item_name = :beer AND likes.bar_name = bar.name AND item.bar_name = bar.name")
        rs = con.execute(query, beer=beer)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['item_cost'] = float(results[i]['item_cost'])
        return results


def get_bars_num_frequents():
    with engine.connect() as con:
        query = sql.text('SELECT bar_name, count(*) as frequentCount \
                FROM frequents \
                GROUP BY bar_name; \
            ')
        rs = con.execute(query)
        results = [dict(row) for row in rs]
        return results


def get_bars_cities():
    with engine.connect() as con:
        rs = con.execute('SELECT DISTINCT city FROM bars;')
        return [row['phone_number'] for row in rs]


def get_beers():
    with engine.connect() as con:
        rs = con.execute('SELECT name, manu FROM beers;')
        return [dict(row) for row in rs]


def get_beer_manufacturers(item_name):
    with engine.connect() as con:
        if item_name is None:
            rs = con.execute('SELECT DISTINCT manu FROM beers;')
            return [row['manu'] for row in rs]

        query = sql.text('SELECT manu FROM beers WHERE name = :item_name;')
        rs = con.execute(query, item_name=item_name)
        result = rs.first()
        if result is None:
            return None
        return result['manu']


def find_person(first):
    with engine.connect() as con:
        query = sql.text("SELECT * FROM  people WHERE CONCAT(first_name, '-', last_name)= :first")
        rs = con.execute(query, first=first)
        result = rs.first()
        if result is None:
            return None
        return dict(result)


def get_people():
    with engine.connect() as con:
        rs = con.execute('SELECT * FROM people;')
        return [dict(row) for row in rs]


def get_employees():
    with engine.connect() as con:
        query = sql.text('SELECT * FROM employees')
        rs = con.execute(query)
        return [dict(row) for row in rs]


def get_transactions():
    with engine.connect() as con:
        rs = con.execute('SELECT * FROM transactions;')
        return [dict(row) for row in rs]


def get_transactions_employee(name):
    with engine.connect() as con:
        rs = con.execute(
            "SELECT * FROM  transactions WHERE CONCAT(employee_first_name, '-', employee_last_name)= :name", name=name)
        return [dict(row) for row in rs]


def get_transactions_person(n):
    with engine.connect() as con:
        rs = con.execute("SELECT * FROM  transactions WHERE CONCAT(first_name, '-', last_name)= :name", name=n)
        return [dict(row) for row in rs]


def get_transactions_item(item_name):
    with engine.connect() as con:
        rs = con.execute(
            'SELECT * FROM transactions WHERE item_name = :item_name;',
            item_name=item_name)
        return [dict(row) for row in rs]
