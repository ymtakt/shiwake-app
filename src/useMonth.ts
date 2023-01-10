import { useState } from "react";
import { format } from 'date-fns'

export const useMonth = () => {
  //日付→今月
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  const nowtoday = new Date();
  const lastMonth1 = today.setMonth(today.getMonth() - 1);
  const lastMonth2 = today.setMonth(today.getMonth() - 1);
  const lastMonth3 = today.setMonth(today.getMonth() - 1);
  const lastMonth4 = today.setMonth(today.getMonth() - 1);
  const lastMonth5 = today.setMonth(today.getMonth() - 1);
  const lastMonth6 = today.setMonth(today.getMonth() - 1);
  const lastMonth7 = today.setMonth(today.getMonth() - 1);
  const lastMonth8 = today.setMonth(today.getMonth() - 1);
  const lastMonth9 = today.setMonth(today.getMonth() - 1);
  const lastMonth10 = today.setMonth(today.getMonth() - 1);
  const lastMonth11 = today.setMonth(today.getMonth() - 1);

  return { nowtoday, lastMonth1, lastMonth2, lastMonth3, lastMonth4, lastMonth5, lastMonth6, lastMonth7, lastMonth8, lastMonth9, lastMonth10, lastMonth11 }
}
