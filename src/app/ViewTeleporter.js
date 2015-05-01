
var state = {
  events: [],
  params: {},
  url: false,
  model: null
}
export class ViewTeleporter {
  constructor() {
    this.url = state.url;
    this.params = state.params;
    this.model = state.model;
    this.modelPath = state.modelPath;
    this.events = state.events;
  }
  onChange(cb) {
    this.events.push({ invoke: cb });
  }
  back() {
    this.details(null);
  }
  invoke(model) {
    this.events.forEach((cb) => { cb.invoke(model); });
  }
  details(model) {
    if (model) {
      state.model = model;
      state.url = true;
      this.model = model;
      this.url = state.url;
      this.invoke(this.model);
    } else {
      state.url = false;
      this.url = state.url;
      this.invoke(null);
    }
  }

}
