import { CryptoWidget } from "./Pages/CryptoWidget/CryptoWidget";
import { ToastContainer, Bounce } from "react-toastify";
import { Routes, Route } from "react-router";
import { RecipientDetail } from "./Pages/RecipientDetails/RecipientDetail";
import { CryptoAddress } from "./Pages/CryptoAddressPage/CryptoAddress";
import { Success } from "./Pages/SuccessPage/Success";

function App() {
  return (
    <>
        <div className="bg-linear-to-br from-green-50 to-blue-50 h-screen  mx-auto flex items-center">
           <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          <Routes>
           
            <Route path="/" element={<CryptoWidget />} />
            <Route path="/recepient-details" element={<RecipientDetail />} />
            <Route path="/crypto-address" element={<CryptoAddress />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
    
    </>
  );
}

export default App;
