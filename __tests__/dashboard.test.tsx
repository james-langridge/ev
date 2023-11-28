import {waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DashBoard from '@/app/dashboard'
import {getProperties} from '@/lib/properties'
import {renderWithClient} from '@/mocks/handlers'

describe('Dashboard tests', () => {
  test('It removes deleted card from list', async () => {
    const {findByTestId, getByText, queryByText} = renderWithClient(
      <DashBoard />,
    )
    const properties = getProperties()

    await waitFor(() => {
      expect(getByText(properties[0].title)).toBeInTheDocument()
    })

    const deleteIcon = await findByTestId(`delete-${properties[0].id}`)
    await userEvent.click(deleteIcon)

    await waitFor(() => {
      expect(queryByText(properties[0].title)).not.toBeInTheDocument()
    })
  })

  test('It adds a new property to the list', async () => {
    const {findByTestId, getByText} = renderWithClient(<DashBoard />)
    const properties = getProperties()
    const listLength = properties.length
    const newPropTitle = 'Foobar Mansion'

    const addBtn = await findByTestId('add-button')
    await userEvent.click(addBtn)

    const titleInput = await findByTestId('title-input')
    await userEvent.type(titleInput, newPropTitle)

    const submitForm = await findByTestId('submit-button')
    await userEvent.click(submitForm)

    await waitFor(() => {
      expect(getByText(newPropTitle)).toBeInTheDocument()
      expect(properties.length).toBe(listLength + 1)
    })
  })
})
