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

describe('Timer component', () => {
  it('adjusts timer when "Adjust Timer" button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<Timer />)
    const adjustTimerButton = getByText('Adjust Timer')
    const startButton = getByText('Start')
    const resetButton = getByText('Reset')

    expect(startButton).toBeTruthy()
    expect(resetButton).toBeTruthy()

    fireEvent.press(adjustTimerButton)

    expect(queryByText('Start')).toBeNull()
    expect(queryByText('Reset')).toBeNull()

    const input = getByPlaceholderText('Enter duration in seconds')
    fireEvent.changeText(input, '60')

    const applyButton = getByText('Apply')
    fireEvent.press(applyButton)

    const studyTime = getByText('1:00')
    expect(studyTime).toBeTruthy()
  })
})
