import {Excel, Header, Toolbar, Formula, Table} from "@/components";
import {createStore} from "@core/createStore";
import {reducer} from "@/redux/reduer";
import {storage} from "@core/utils";

import "./scss/index.scss";

const store = createStore(reducer, storage("state"))

store.subscribe((store) => storage("state", store))

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render()
