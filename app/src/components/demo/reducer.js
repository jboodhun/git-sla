const initialState = {
  "record-1": { artist: "Deftones", name: "White Pony" },
  "record-2": { artist: "Metallica", name: "Metallica" },
  "record-3": { artist: "NIN", name: "The Fragile" }
};

export default function reducer(state = initialState, action) {
  switch (action) {
    default:
      return state;
  }
}
