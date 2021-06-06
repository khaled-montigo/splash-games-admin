import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./index"

const makeStore = () => createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument())))

export const store = createWrapper(makeStore)
