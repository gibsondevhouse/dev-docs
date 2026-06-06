import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-full min-h-0 w-full bg-background">
      <Sidebar activeItem="chat" />
      <main className="min-w-0 flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}
