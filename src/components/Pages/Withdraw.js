import React, { useMemo } from 'react'
import Button from "../Button/Button"
import Page from "../Page/Page"
import { useTable } from 'react-table';
import "./Withdraw.css"


const currentDeposits = [
    {
        "charity_name": "Charity 1",
        "token": "ETH",
        "rate": 5,
        "amount": 10,
    },
    {
        "charity_name": "Charity 2",
        "token": "ETH",
        "rate": 8,
        "amount": 12,
    },
    {
        "charity_name": "47f7sf6af7as7f6...",
        "token": "BTC",
        "rate": 15,
        "amount": 3,
    },
    {
        "charity_name": "Charity 3",
        "token": "USDT",
        "rate": 20,
        "amount": 2000,
    },
];

const withdrawColumns = [
    {
        Header: 'Charity Vault Name/Address',
        accessor: 'charity_name',
    },
    {
        Header: 'Token/Currency',
        accessor: 'token',
    },
    {
        Header: 'Gift Rate',
        accessor: 'rate',
    },
    {
        Header: 'Amount Deposited',
        accessor: 'amount',
    },
]

const Withdraw = () => {
    const columns = useMemo(() => withdrawColumns, []);
    const data = useMemo(() => currentDeposits, []);


    const withdrawTableInstance = useTable({
        columns: columns,
        data: data,
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = withdrawTableInstance;

    return (
        <Page>
            <div className="withdraw-container">
                <div className="withdraw-header-container">
                    <h1 className="withdraw-header">Withdraw</h1>
                    <h6 className="withdraw-subheader">Select one of your deposits to withdraw.</h6>
                </div>
                <div className="table-container">
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroups => (
                                <tr {...headerGroups.getHeaderGroupProps()}>
                                    {headerGroups.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </th>
                                    ))
                                    }
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="withdraw-buttons-container">
                    <Button isDark={true}>Deselect</Button>
                    <Button>Withdraw</Button>
                </div>
            </div>
        </Page>
    )
}

export default Withdraw;
