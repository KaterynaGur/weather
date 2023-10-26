import create from 'zustand';

const useDayStore = create((set) => ({
  weatherDay: {},
  weatherHours: [],

  setWeatherDay: (weatherDay) => set({ weatherDay }),
  setWeatherHours: (weatherDay) => set([ weatherDay ]),

}));

export default useDayStore;
