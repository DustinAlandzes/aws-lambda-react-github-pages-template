import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from "react";
import Page from "@/app/page"

describe('Home', () => {
  it('renders', () => {
    render(<Page />)
  });
})

