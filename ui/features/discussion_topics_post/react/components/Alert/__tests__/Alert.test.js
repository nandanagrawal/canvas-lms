/*
 * Copyright (C) 2021 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import {Alert} from '../Alert'

import React from 'react'

import {fireEvent, render} from '@testing-library/react'

const setup = withOverrides => {
  const overrides = [
    {
      id: 'QXNzaWdebTVubC0x',
      _id: '1',
      dueAt: '2021-03-30T23:59:59-06:00',
      lockAt: '2021-04-03T23:59:59-06:00',
      unlockAt: '2021-03-24T00:00:00-06:00',
      title: 'assignment override 1'
    },
    {
      id: 'QXMzaWdebTubeC0x',
      _id: '2',
      dueAt: '2021-03-27T23:59:59-06:00',
      lockAt: '2021-04-03T23:59:59-06:00',
      unlockAt: '2021-03-21T00:00:00-06:00',
      title: 'assignment override 2'
    },
    {
      id: 'BXMzaWdebTVubC0x',
      _id: '3',
      dueAt: '2021-03-27T23:59:59-06:00',
      lockAt: '2021-09-03T23:59:59-06:00',
      unlockAt: '2021-03-21T00:00:00-06:00',
      title: 'assignment override 3'
    }
  ]
  return withOverrides
    ? render(
        <Alert
          pointsPossible={7}
          dueAtDisplayText="Jan 26 11:49pm"
          assignmentOverrides={overrides}
          canSeeMultipleDueDates={withOverrides}
        />
      )
    : render(
        <Alert
          pointsPossible={7}
          dueAtDisplayText="Jan 26 11:49pm"
          assignmentOverrides={[]}
          canSeeMultipleDueDates={withOverrides}
        />
      )
}

describe('Alert', () => {
  it('displays points possible info', () => {
    const {queryByText} = setup(false)
    expect(queryByText('This is a graded discussion: 7 points possible')).toBeTruthy()
  })

  it('displays due date when there are no overrides', () => {
    const {queryByText} = setup(false)
    expect(queryByText('Due: Jan 26 11:49pm')).toBeTruthy()
  })

  it('displays "Show due dates" button when there are overrides', () => {
    const {queryByText} = setup(true)
    expect(queryByText('Show due dates (3)')).toBeTruthy()
  })

  it('displays tray and correctly formatted dates', async () => {
    const {queryByText, findByText, findByTestId} = setup(true)
    expect(await queryByText('Show due dates (3)')).toBeTruthy()
    fireEvent.click(queryByText('Show due dates (3)'))
    expect(await findByTestId('due-dates-tray-heading')).toBeTruthy()
    expect(await findByText('Sep 4 5:59am')).toBeTruthy()
  })
})
