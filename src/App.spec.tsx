import { render, screen } from '@testing-library/react'

import App from 'src/App'

describe('App', () => {
  it('should detect default text', () => {
    render(<App />)

    const helloWorldText = screen.getByText('Loopz Boosterz: CRA + TypeScript')

    expect(helloWorldText).toBeInTheDocument()
  })
})
