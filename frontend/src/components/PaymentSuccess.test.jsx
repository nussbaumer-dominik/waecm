import React from "react";
import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/react'
import PaymentSuccess from "./PaymentSuccess";

describe('PaymentSuccess test', () => {
  it('paymentSuccesspage displays the correct info', () => {
    const paymentInfo = {
      amount: "",
      fee: "",
      description: "",
      currency: "EUR",
      state: "success",
      payReq: "",
      id: "",
    }

    render(<PaymentSuccess paymentInfo={paymentInfo}/>)

    expect(screen.getByText("Zahlung erfolgreich durchgeführt")).toBeDefined();
    expect(screen.getByText("Neue Zahlung")).toBeDefined();
    //expect(screen.getByRole("button").label).toBe("Neue Zahlung");
    expect(screen.getByRole("button")).toBeDefined();
    expect(screen.getByRole("link")).toBeDefined();
  })
})