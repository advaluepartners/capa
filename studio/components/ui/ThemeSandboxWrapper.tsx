import { useThemeSandbox } from 'packages/common/hooks/useThemeSandbox'

export function ThemeSandboxWrapper({ children }: { children: React.ReactNode }) {
    useThemeSandbox();
    return <>{children}</>;
  }

