import React from 'react'
import { render } from '@testing-library/react-native'
import Timer from '../Timer'

describe('Timer', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Timer />)
    const studyTimeLabel = getByText('Study Time:')
    const pausedTimeLabel = getByText('Paused Time:')

    expect(studyTimeLabel).toBeTruthy()
    expect(pausedTimeLabel).toBeTruthy()
  })
})
