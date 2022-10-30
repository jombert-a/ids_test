import { createApp } from "vue";
import App from "./App.vue";
import "./assets/utils.css";
import { SetupCalendar, DatePicker } from "v-calendar";

const app = createApp(App);
app.use(SetupCalendar, {});
app.component("DatePicker", DatePicker);

app.mount("#app");
