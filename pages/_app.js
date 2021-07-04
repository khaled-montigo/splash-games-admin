import { Provider } from 'react-redux';
import { store } from '../reducers/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/overlay.css'
import '../styles/layout.css'
import '../styles/utility.css'
import '../styles/globals.css'
import '../styles/side.css'
import '../styles/setting.css'
import '../styles/formWizard.css'
import '../styles/login.css'
import Layout from "../components/layout/Layout";
import { CookiesProvider } from "react-cookie"

function MyApp({ Component, pageProps }) {
<<<<<<< HEAD
    if(Component.name == "Login"){
        return (
            <CookiesProvider>
=======

    return (
        <CookiesProvider>
            <Layout>
>>>>>>> d0d1032f94a1a1a88090603b660e533bf399732d
                <Component {...pageProps} />
            </Layout>
        </CookiesProvider>
    );

<<<<<<< HEAD
        )
    }else{
  return (
      <CookiesProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
      </CookiesProvider>
  );
=======
>>>>>>> d0d1032f94a1a1a88090603b660e533bf399732d
}
}
export default store.withRedux(MyApp);
