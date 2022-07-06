import { startsWith } from 'lodash';

export const paymentModes = [
  {
    label: 'MasterCard, Visa',
    value: 'ONLINE',
  },
  {
    label: 'Point of Sale',
    value: 'POSPMT',
  },
  {
    label: 'Mobile Money & Airtel',
    value: 'MOBPMT',
  },
  {
    label: 'Over-the-counter Bank payment',
    value: 'CASH',
  },
  {
    label: 'Cheque payments',
    value: 'CHQ',
  },
  {
    label: 'Electronic funds transfer',
    value: 'EFT',
  },
  {
    label: 'Direct Debit',
    value: 'DD',
  },
  {
    label: 'Real Time Gross Settlement',
    value: 'RTGS',
  },
  {
    label: 'SWIFT',
    value: 'SWIFT',
  },
];

export const paymentBanks = [
  {
    label: 'Bank of Africa',
    value: 'BOA',
  },
  {
    label: 'Bank of Baroda',
    value: 'BOB',
  },
  {
    label: 'Barclays Bank',
    value: 'BRC',
  },
  {
    label: 'COMMERCIAL BANK OF AFRICA UGANDA LIMITED',
    value: 'CBA',
  },
  {
    label: 'Cairo International Bank',
    value: 'CIB',
  },
  {
    label: 'Centenary Bank',
    value: 'CNB',
  },
  {
    label: 'Citi Bank',
    value: 'CTB',
  },
  {
    label: 'Dfcu Bank',
    value: 'DFC',
  },
  {
    label: 'Diamond Trust Bank',
    value: 'DTB',
  },
  {
    label: 'Eco Bank',
    value: 'ECO',
  },
  {
    label: 'Equity Bank Uganda Limited',
    value: 'EQB',
  },
  {
    label: 'Exim Bank Uganda Limited',
    value: 'IBL',
  },
  {
    label: 'Finance Trust Bank Limited',
    value: 'FTB',
  },
  {
    label: 'Guarantee Trust Bank Uganda Limited',
    value: 'GNB',
  },
  {
    label: 'Housing Finance Bank',
    value: 'HFB',
  },
  {
    label: 'KCB Bank Uganda',
    value: 'KCB',
  },
  {
    label: 'NC Bank Uganda Limited',
    value: 'NCB',
  },
  {
    label: 'Orient Bank',
    value: 'ORN',
  },
  {
    label: 'Post Bank Uganda Limited',
    value: 'PBU',
  },
  {
    label: 'Stanbic Bank',
    value: 'STN',
  },
  {
    label: 'Standard Chartered',
    value: 'SCB',
  },
  {
    label: 'Tropical Bank Ltd',
    value: 'TAB',
  },
  {
    label: 'United Bank for Africa',
    value: 'UBA',
  },
];

export const getInvoiceAmount = (invoices, findKey, keyName) => {
  const filterInvoices = invoices.filter((invoice) =>
    startsWith(invoice.invoice_number, findKey)
  );
  return filterInvoices.map((invoice) => {
    return { [keyName]: invoice.id, amount: invoice.amount };
  });
};
