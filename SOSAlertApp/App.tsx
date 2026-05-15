import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "./src/components/loginForm";

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <LoginForm
            onSubmit={async (email, password) => {
              console.log("Login:", email, password);
              await new Promise((r) => setTimeout(r, 1000));
            }}
        />
      </SafeAreaView>
  );
}