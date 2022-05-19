import React from "react";
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import NewPayment from "./NewPayment";

describe('NewPayment test', () => {
  it('newpayment displays the correct info and calculates Satoshi', () => {
    const paymentInfo = {
      amount: "1",
      fee: "",
      description: "",
      currency: "EUR",
      state: "success",
      payReq: "",
      id: "",
    }

    const rates = {
      BTCEUR: {BTC: 0.00003592, EUR: 27840.64, currency: "Euro"}
    }

    const {container} = render(<NewPayment paymentInfo={paymentInfo} rates={rates}/>);
    expect(screen.getByText("Neue Zahlung")).toBeDefined();
    expect(screen.getByText("Betrag")).toBeDefined();
    expect(screen.getByText("Beschreibung (Optional)")).toBeDefined();
    expect(screen.getByText("EUR")).toBeDefined();
    expect(screen.getByText("Bezahlen")).toBeDefined();
    expect(container.querySelector("#amount").value).equals("1");
    const parsed = parseFloat(container.querySelector("#convertedSatoshi").textContent);
    expect(parsed).equals(3.592);
    expect(screen.getByText("3.592,00 SAT")).toBeDefined();
  })
})