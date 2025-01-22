import { StatusBar } from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import store from "./src/hooks/redux/store";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
}
