class ActualEventStore {
  constructor() {
    this.event = null;
  }

  add(event) {
    this.event = event;
  }

  use() {
    return this.event;
  }
}

const actualEventStore = new ActualEventStore()
export default actualEventStore
