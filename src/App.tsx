import { BrowserRouter } from "react-router-dom";

import './shared/forms/TraducoesYup'; // Garantindo que o codigo YUP será executado pela aplicação. sem isso ele não funcionará

import { AppThemeProvider, AuthProvider, DrawerProvider } from "./shared/contexts";
import { Login, MenuLateral } from "./shared/components";
import { AppRouters } from "./routes";

export const App = () => {

  return (
    <AuthProvider>
      <AppThemeProvider>

        <Login>

          <DrawerProvider>
            <BrowserRouter>

              <MenuLateral>
                <AppRouters />
              </MenuLateral>

            </BrowserRouter>
          </DrawerProvider>

        </Login>

      </AppThemeProvider>
    </AuthProvider>
  );
}

export default App;
