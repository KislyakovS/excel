import {Excel, Header, Toolbar, Formula, Table} from "@/components";
import {createStore} from "@core/createStore";
import {reducer} from "@/redux/reduer";
import {storage, debounce} from "@core/utils";
import {initState} from "@/redux/initState";

import "./scss/index.scss";

const store = createStore(reducer, initState)

const stateListener = debounce((store) => storage("state", store), 300)

store.subscribe(stateListener)

const excel = new Excel("#app", {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render()
