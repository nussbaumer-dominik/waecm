import { describe, expect, it } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import App from "./App";

describe('Simple working test', () => {
    it('the title is visible', () => {
      render(<App />)
      expect(screen.getByText(/Hello Vite \+ React!/i)).toBeInTheDocument()
    })
  
    it('should increment count on click', async () => {
      render(<App />)
      userEvent.click(screen.getByRole('button'))
      expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument()
    })
  })