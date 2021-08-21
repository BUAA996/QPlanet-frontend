import AppContent from "components/global/AppContent";
import AppHeader from "components/global/AppHeader";
import { useEffect } from "react";
import { isLogin } from "api/auth";
import { useDispatchStore } from "store";

function App() {
  const dispatch = useDispatchStore();

  useEffect(() => {
    isLogin().then((res) => {
      dispatch({ type: res.data.result === 1 ? "login" : "logout" });
    });
  });

  return (
    <div className="App">
      <AppHeader />
      <AppContent />
    </div>
  );
}

export default App;
