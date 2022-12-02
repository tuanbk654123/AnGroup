import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '~/redux/store'
import reportWebVitals from './reportWebVitals'
import App from './App'
import AuthProvider from '~/utils/authProvider';
import './i18n/config'
import 'react-quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'
import '~/styles/index.css'
import userManager, { loadUserFromStorage } from './services/auth/loginService'

render(
  <StrictMode>
    <Provider store={store}>
      {/* <AuthProvider userManager={userManager} store={store} > */}
      <ToastContainer />
      <App />
      {/* </AuthProvider> */}
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
