import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { ChatScreen } from "./screens/ChatScreen";
import { ReposScreen } from "./screens/ReposScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/repos" element={<ReposScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </AppShell>
  );
}

export default App;
