class UUIDGenerator {
  _uuids = [];

  get(prefix) {
    while(true) {
      const id = Math.round(Math.random() * 1000);
      const uuid = prefix ? `${prefix}__${id}` : `${id}`;

      if(this._uuids.includes(uuid)) {
        continue;
      }

      this._uuids.push(uuid);
      return uuid;
    }
  }

  del() {}
}

window.uuidGenerator = new UUIDGenerator();