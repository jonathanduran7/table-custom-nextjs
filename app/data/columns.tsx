import React from 'react';
import { IColumn } from "../interface/column.interface";

export const columns: IColumn[] = [
    {
        title: 'Cuenta',
        key: 'accountName',
        children: () => <div>Children</div>
    },
    {
        title: 'Tipo de cuenta',
        key: 'accountType',
        styles: {
            fontWeight: 'bold',
        }
    },
    {
        title: 'Moneda',
        key: 'currency'
    },
    {
        title: 'Balance',
        key: 'amount',
        styles: {
            fontWeight: 'bold',
            color: (row) => row.amount < 0 ? '#f00' : 'green'
        },
        parse: (row) => row < 0 ? `-$${Math.abs(row)}` : `$${row}`,
        defaultValue: '0'
    },
    {
        title: 'Usuario',
        key: 'user.name',
        defaultValue: 'No encontrado'
    }
]