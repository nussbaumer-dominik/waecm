import React from "react";
import {describe, expect, it} from 'vitest'
import {render} from '@testing-library/react'
import Settings from "./Settings";

describe('Settings test', () => {
    it('all texts are visible and the input fields have the correct value', () => {
        // providing a state object
        const state = {
            user: {
                id_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1NEhYbVc3SXpCandWMktoRk5WMHNraml2WHRtbVY2UjRMZXZZWG9TdU5RIn0.eyJleHAiOjE2NTI5NDI1MDgsImlhdCI6MTY1Mjk0MjIwOCwiYXV0aF90aW1lIjoxNjUyOTQyMjA4LCJqdGkiOiIyNTJkZGEzMS1kMDdiLTQ0NWMtOTQ3ZC02MjUzMzc2Y2Y3YTIiLCJpc3MiOiJodHRwczovL3dhZWNtLXNzby5pbnNvLnR1d2llbi5hYy5hdC9yZWFsbXMvd2FlY20iLCJhdWQiOiJ3YWVjbSIsInN1YiI6ImVmZmEzZDFlLTQ2YTgtNGZhYi04MzE1LTU5YWVhMDU1N2VhOCIsInR5cCI6IklEIiwiYXpwIjoid2FlY20iLCJzZXNzaW9uX3N0YXRlIjoiNzRkMGEzMmItNDQ2Yy00ODMxLTkwOWQtZjY0ZmMy...",
                session_state: "74d0a32b-446c-4831-909d-f64fc2891d15",
                access_token: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1NEhYbVc3SXpCandWMktoRk5WMHNraml2WHRtbVY2UjRMZXZZWG9TdU5RIn0.eyJleHAiOjE2NTI5NDI1MDgsImlhdCI6MTY1Mjk0MjIwOCwiYXV0aF90aW1lIjoxNjUyOTQyMjA4LCJqdGkiOiJlY2ZkMjA2My0zMWNkLTQzNzItOTk3NC00NGYxYjIyMjJkOTIiLCJpc3MiOiJodHRwczovL3dhZWNtLXNzby5pbnNvLnR1d2llbi5hYy5hdC9yZWFsbXMvd2FlY20iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWZmYTNkMWUtNDZhOC00ZmFiLTgzMTUtNTlhZWEwNTU3ZWE4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2FlY20iLCJzZXNzaW9uX3N0YXRlIjoiNzRkMGEzMmItNDQ2Yy00ODMxLTkwOWQt...",
            },
            dbUser: {
                id: "effa3d1e-46a8-4fab-8315-59aea0557ea8",
                name: "John Foo",
                apiKeyStored: true,
                localCurrency: "EUR"
            },
            settings: {
                apiKey: "****",
                localCurrency: "EUR"
            },
            rates: {
                BTCEUR: {BTC: 0.00003592, EUR: 27840.64, currency: "Euro"}
            }
        }
        const {container, getByText, getByLabelText } = render(<Settings state={state}/>)
        expect(getByText("Opennode Api-Key")).toBeDefined();
        expect(getByText("Lokale Währung")).toBeDefined();
        expect(getByText("Speichern")).toBeDefined();
        expect(getByText("Abmelden")).toBeDefined();
        expect(getByLabelText("Abmelden")).toBeDefined();
        expect(container.querySelector(".p-inputtext").value).toBe("****")
        expect(container.querySelector(".p-dropdown-label").textContent).toBe("EUR")
    })
})