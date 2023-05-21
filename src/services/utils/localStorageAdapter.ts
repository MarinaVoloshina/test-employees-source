type ItemWithPk<T> = { id: number } & T;

export default class LocalStorageAdapter<T> {
  key!: string;

  getItems(): Array<ItemWithPk<T>> {
    const data: any = JSON.parse(localStorage.getItem(this.key) || "{}");
    return Array.isArray(data.items) ? data.items : [];
  }

  setItems(data: Array<ItemWithPk<T>>) {
    localStorage.setItem(this.key, JSON.stringify({ items: data || [] }));
  }

  get(id: number): ItemWithPk<T> {
    const data = this.getItems().find((e) => e.id === id);

    if (typeof data === "undefined")
      throw new Error(`Записи с id ${id} не существует`);

    return data;
  }
  post(data: ItemWithPk<T>) {
    const items = this.getItems();
    const newItem = {
      ...data,
      id: items.length ? Math.max(...items.map((e) => e.id)) + 1 : 1,
    };

    this.setItems([...items, newItem]);
  }

  put(data: ItemWithPk<T>) {
    const items = this.getItems();
    const idx = this.getItems().findIndex((e) => e.id === data.id);

    if (idx === -1) throw new Error(`Записи с id ${data.id} не существует`);

    items[idx] = data;
    this.setItems(items);
  }

  delete(id: number) {
    const items = this.getItems();

    this.setItems(items.filter((e) => e.id !== id));
  }

  constructor(key: string) {
    this.key = key;
  }
}
