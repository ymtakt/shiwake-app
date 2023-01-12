import React from 'react'
import { assets, cost, earnings, liabilities, netWorth } from '../account'

export const AccountSelectOptions = () => {
  return (
    <>
      <option disabled>資産</option>
      {assets.map((name) => (
        <option key={name} value={name}>&nbsp;&nbsp;&nbsp;&nbsp;{name}</option>
      ))}
      <option disabled>負債</option>
      {liabilities.map((name) => (
        <option key={name} value={name}>&nbsp;&nbsp;&nbsp;&nbsp;{name}</option>
      ))}
      <option disabled>純資産</option>
      {netWorth.map((name) => (
        <option key={name} value={name}>&nbsp;&nbsp;&nbsp;&nbsp;{name}</option>
      ))}
      <option disabled>収益</option>
      {earnings.map((name) => (
        <option key={name} value={name}>&nbsp;&nbsp;&nbsp;&nbsp;{name}</option>
      ))}
      <option disabled>費用</option>
      {cost.map((name) => (
        <option key={name} value={name}>&nbsp;&nbsp;&nbsp;&nbsp;{name}</option>
      ))}
    </>
  )
}
