import React, { useMemo, useState } from 'react'
import Button from "../Button/Button"
import Modal from "../Modal/Modal"
import Input from "../Input/Input"
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

    const [selectedRowInfo, setSelectedRowInfo] = useState(null);
    let selectedRowVaultName;
    if (selectedRowInfo) {
        selectedRowVaultName = selectedRowInfo.charity_name;
    }

    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    // To display error messages
    const [showWithdrawErrorModal, setShowWithdrawErrorModal] = useState(false);
    const [withdrawErrorModalContent, setWithdrawErrorModalContent] = useState(null);

    const [amountToWithdraw, setAmountToWithdraw] = useState("");

    const withdrawTableInstance = useTable({
        columns: columns,
        data: data,
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = withdrawTableInstance;

    const initiateWithdraw = () => {
        let withdrawModalContent;
        if (!selectedRowInfo) {
            withdrawModalContent = <span style={{ "font-size": "18px" }}>
                Must select a deposit to withdraw!
            </span>;
            setWithdrawErrorModalContent(withdrawModalContent);
            setShowWithdrawErrorModal(true);
        } else {
            setShowWithdrawModal(true);
        }
    }

    const doWithdraw = () => {
        let withdrawMessage;
        if (!amountToWithdraw) {
            withdrawMessage = "Must enter an amount to withdraw";
        } else if (amountToWithdraw <= 0) {
            withdrawMessage = "Must withdraw a positive amount";
        } else if (amountToWithdraw > selectedRowInfo.amount) {
            withdrawMessage = "Cannot withdraw more than the deposit amount";
        } else {
            withdrawMessage = "Withdrew successfully!";
        }
        setShowWithdrawModal(false);
        setWithdrawErrorModalContent(withdrawMessage);
        setShowWithdrawErrorModal(true);
        setAmountToWithdraw("");
    }

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
                                    <tr {...row.getRowProps()} id={row.original.charity_name === selectedRowVaultName ? "selected-row" : ""}
                                        onClick={() => setSelectedRowInfo(row.original)}>
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="withdraw-buttons-container">
                    <Button isDark={true} onClick={() => setSelectedRowInfo(null)}>Deselect</Button>
                    <Button onClick={() => initiateWithdraw()}>Withdraw</Button>
                </div>
            </div>
            <Modal show={showWithdrawModal} buttonText="Confirm Withdrawal" extraButtonText="Cancel"
			extraButtonClick={() => setShowWithdrawModal(false)} handleClose={() => doWithdraw()}>
                <div>
                    <h2 className="modal-header">{selectedRowInfo ? selectedRowInfo.charity_name : ""}</h2>
                    <div>
                        <span className="modal-span"><strong>Gift Rate:</strong> {selectedRowInfo ? selectedRowInfo.rate : ""}%</span>
                    </div>
                    <div>
                        <span className="modal-span"><strong>Amount Deposited:</strong> {selectedRowInfo ? selectedRowInfo.amount : ""} {selectedRowInfo ? selectedRowInfo.token : ""}</span>
                    </div>
                    <div>
                        <span className="modal-span" style={{ "text-decoration": "underline" }}><strong>Amount To Withdraw</strong></span>
                    </div>
                    <div className="small-input-container">
                        <Input value={amountToWithdraw}
                            onChange={(event) => { setAmountToWithdraw(event.target.value) }}
                            type="number" placeholder="XXXXXXXXXXXXXXXXX" />
                    </div>
                </div>
            </Modal>
            <Modal show={showWithdrawErrorModal} handleClose={() => setShowWithdrawErrorModal(false)}>
                {withdrawErrorModalContent}
            </Modal>
        </Page>
    )
}

export default Withdraw;
