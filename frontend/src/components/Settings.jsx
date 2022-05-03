import * as React from "react";
import {toast, ToastContainer} from "react-toastify";
import {InputText} from "primereact/inputtext";
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';

export default function Settings({state, setSettings, api, addUser, logout}) {
  if (state.user == null) {
    window.location = "/";
  }

  const rates = Object.entries(state.rates).map(([key]) => {
    return {
      label: key.substring(3),
      value: key.substring(3)
    }
  });

  const handleKeyChange = event => {
    state.settings.apiKey = event.target.value;
    setSettings({...state.settings});
  }

  const handleCurrencyChange = event => {
    state.settings.localCurrency = event.target.value;
    setSettings({...state.settings});
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (state.settings.apiKey !== "****") {
      api.changeApiKey(state.settings.apiKey);
    }

    api.changeCurrency(state.settings.localCurrency)
      .then(() => addUser());

    toast("The settings have been updated");
  }

  return (
    <div className="lg:px-7">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover/>

      <div className="col flex justify-content-center">
        <div className="md:w-6 sm:w-full p-3 border border-round">
          <div className="field">
            <label htmlFor="key">Opennode Api-Key</label>
            <InputText id="key"
                       className="p-inputtext inputfield w-full"
                       value={state.settings.apiKey}
                       onChange={handleKeyChange}/>
          </div>
          <div className="field">
            <label htmlFor="currency">Lokale Währung</label>
            <Dropdown className="inputfield w-full"
                      value={state.settings.localCurrency} options={rates} onChange={handleCurrencyChange}/>
          </div>
          <Button label="Speichern" onClick={handleSubmit}/>
        </div>
      </div>

      <div className="grid mt-7">
        <div className="col flex justify-content-center">
          <Button label="Abmelden" onClick={logout}/>
        </div>
      </div>
    </div>
  );
}
