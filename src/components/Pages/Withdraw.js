import React from 'react'
import Page from "../Page/Page"
import Card from "../Card/Card"
import { useTable } from 'react-table';
import "./Withdraw.css"


const Withdraw = () => {

    const data = React.useMemo(() =>
    [
        {
            vault: 'XXXXXXXXXXXXXXXXXX',
            token: 'ABC',
            wallet: 'XYZ',
            rate: '0%',
        },
        {
            vault: 'XXXXXXXXXXXXXXXXXX',
            token: 'ABC',
            wallet: 'XYZ',
            rate: '0%',
        },
        {
            vault: 'XXXXXXXXXXXXXXXXXX',
            token: 'ABC',
            wallet: 'XYZ',
            rate: '0%',
        },
        {
            vault: 'XXXXXXXXXXXXXXXXXX',
            token: 'ABC',
            wallet: 'XYZ',
            rate: '0%',
        },
        {
            vault: 'XXXXXXXXXXXXXXXXXX',
            token: 'ABC',
            wallet: 'XYZ',
            rate: '0%',
        },
    ],
    []
   )

   const columns = React.useMemo(
    () => [
        {
        Header: ' ',
        columns: [
            {
                Header: 'Charity Vault Name',
                accessor: 'vault',
            },
            {
                Header: 'Token',
                accessor: 'token',
            },
            {
                Header: 'Wallet',
                accessor: 'wallet',
            },
            {
                Header: 'Interest Rate',
                accessor: 'rate',
            },
            ],
        },
    ],
    []
   )

   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
   } = useTable({ columns, data })

    return (
        <Page>
            <h1>Withdraw</h1>
            <div className="withdraw-card-container">
                <Card name="Lorem Ipsum"/>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </Page>
    )
}

export default Withdraw;
