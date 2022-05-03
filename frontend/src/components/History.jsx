import * as React from "react";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function History(props) {
  if (props.user == null) {
    window.location = "/";
  }

  const [history, setHistory] = useState([]);

  useEffect(() => {
    props.api.getHistory()
      .then(res => {
        const parsedObjects = res.data.map(item => {
          const parsedDate = new Date(item.created_at * 1000);
          console.log(item);
          return {
            amount: item.amount,
            created_at: parsedDate.toLocaleString("de-AT"),
            currency: item.currency,
            description: item.description,
            fiat_value: item.source_fiat_value,
          }
        });
        setHistory(parsedObjects);
        toast.success(`Api returned ${parsedObjects.length} successful payments.`);
      })
      .catch(e => {
        toast.error(e);
      });
  }, [])


  return (
    <div className="lg:mx-8 md:mx-6 flex justify-content-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover/>
      {history.length > 0 ?
        <div className="mt-4 lg:w-6 w-full">
          {history.map((payment, index) => (
            <div key={index} className="mb-2">
              <div className="surface-card shadow-2 p-3 border-round">
                <div className="flex justify-content-between mb-3">
                  <div>
                    <span className="block text-500 font-medium mb-3">{payment.created_at}</span>
                    <div className="text-900 font-medium text-xl">
                      {payment.amount} SAT

                    </div>
                    <span className="text-gray-500 font-light text-base">{payment.fiat_value} {payment.currency}</span>
                  </div>
                  <div className="flex align-items-center justify-content-center bg-green-100 border-round"
                       style={{width: '2.5rem', height: '2.5rem'}}>
                    <i className="pi pi-check-circle text-green-500 text-xl"></i>
                  </div>
                </div>
                <div>
                  {payment.description}
                </div>
              </div>
            </div>
          ))}
        </div> :
        <div>
          Ihre Historie ist derzeit leer.
        </div>
      }
    </div>
  );
}