// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// hooks
import useAuth from "./hooks/useAuth";
// components
import NotistackProvider from "./components/NotistackProvider";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen, { ProgressBarStyle } from "./components/LoadingScreen";

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <RtlLayout>
        <NotistackProvider>
          <GlobalStyles />
          <ProgressBarStyle />
          <ScrollToTop />
          {isInitialized ? <Router /> : <LoadingScreen />}
        </NotistackProvider>
      </RtlLayout>
    </ThemeConfig>
  );
}
