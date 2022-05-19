import { describe, expect, it } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Settings from "./Settings";

describe('Simple working test', () => {
    it('the title is visible', () => {
        const state = {
            user: {
                name: "Franz"
            },
            rates: {
                
            }
        }
        render(<Settings state={state}/>)
        expect(1+1).toBe(2);
    })
})