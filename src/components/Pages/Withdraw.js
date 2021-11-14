import React, { useMemo, useState, useEffect, useContext } from 'react'
import Button from "../Button/Button"
import Modal from "../Modal/Modal"
import Input from "../Input/Input"
import Page from "../Page/Page"
import { useTable } from 'react-table';
import { ethers } from 'ethers'
import bigInt from "big-integer";
import { getCharityVaultFactoryContract, getCharityVaultContractByAddress } from './../../Contracts'
import RariContext from '../../Context';
import { getTokenFromAddress, getCharityFromAddress } from '../../helpers'
import "./Withdraw.css"
import { connectCachedProvider } from './Connect';


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
        Header: 'Balance',
        accessor: 'amount',
    },
    {
        Header: 'Interest',
        accessor: 'interest',
    }
]

const WithdrawTable = ({ columns, data, selectedRowVaultName, selectedRowGiftRate, setSelectedRowInfo, isLoading }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns: columns,
        data: data,
    });

    let messageSpan = <span className="withdraw-table-span">Loading</span>;
    let body;
    if (!isLoading) {
        if (rows) {
            body = <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} id={row.original.charity_name === selectedRowVaultName && row.original.rate === selectedRowGiftRate ? "selected-row" : ""}
                            onClick={() => setSelectedRowInfo(row.original)}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    )
                })}
            </tbody>;
            messageSpan = null;
        } else {
            messageSpan = <span className="withdraw-table-span">No Current Deposits</span>
        }
    }

    return (
        <>
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
                {body}
            </table>
            {messageSpan}
        </>
    );
}

const Withdraw = () => {
    const context = useContext(RariContext);
    const provider = context.web3provider;
    const signer = context.web3signer;
    const setProvider = context.setProvider;
    const setSigner = context.setSigner;

    const [depositData, setDepositData] = useState([]);
    const [gotDepositData, setGotDepositData] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);

    const columns = useMemo(() => withdrawColumns, []);

    const [selectedRowInfo, setSelectedRowInfo] = useState(null);
    let selectedRowVaultName;
    let selectedRowGiftRate;
    if (selectedRowInfo) {
        selectedRowVaultName = selectedRowInfo.charity_name;
        selectedRowGiftRate = selectedRowInfo.rate;
    }

    const [showWithdrawModal, setShowWithdrawModal] = useState(false);

    // To display error messages
    const [showWithdrawErrorModal, setShowWithdrawErrorModal] = useState(false);
    const [withdrawErrorModalContent, setWithdrawErrorModalContent] = useState(null);

    const [amountToWithdraw, setAmountToWithdraw] = useState("");

    const handleProvider = async () => {
        setIsLoadingData(true);
        await connectCachedProvider(provider, setProvider, setSigner);
        setIsLoadingData(false);
    }

    const getDepositData = async () => {
        setIsLoadingData(true);
        const vaultFactoryContract = getCharityVaultFactoryContract(signer);
        const filter = vaultFactoryContract.filters.CharityVaultDeployed(null, null);
        const events = await vaultFactoryContract.queryFilter(filter);

        let newCurrentDeposits = [];

        // We now have the deployed vault addresses and we need the deposited balances.
        // We can do this by looking at the user's balance of the tokens.
        for (const event of events) {
            let charityVault = getCharityVaultContractByAddress(event.args.vault, signer);
            let balance = await charityVault.balanceOf(provider.provider.selectedAddress);
            balance = ethers.utils.formatEther(balance);
            if (balance > 0) {
                // Build deposit object
                let charity = await charityVault.CHARITY();
                let underlying = await charityVault.UNDERLYING();
                let rate = await charityVault.BASE_FEE();
                // TODO: Get proper amount for the underlying balance (handle rates and stuff)
                // TODO: fetch amount of interest here
                newCurrentDeposits.push({
                    "charity_vault_address": event.args.vault,
                    "charity_name": getCharityFromAddress(charity),
                    "token": getTokenFromAddress(underlying),
                    "rate": parseInt(rate),
                    "amount": balance,
                    "interest": "N/A"
                });
            }
        };
        setDepositData(newCurrentDeposits);

        // Set current deposits to new current deposits.
        setSelectedRowInfo(null);
        setIsLoadingData(false);
        setGotDepositData(true);
    };

    if (!gotDepositData && !isLoadingData) {
        if (!signer) {
            handleProvider();
        } else {
            setIsLoadingData(true);
            getDepositData();
        }
    }

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

    const doWithdraw = async () => {
        let withdrawMessage;
		console.log("amount requested withdraw", amountToWithdraw);
		console.log("amount available", selectedRowInfo.amount);
        if (!amountToWithdraw) {
            withdrawMessage = "Must enter an amount to withdraw";
        } else if (amountToWithdraw <= 0) {
            withdrawMessage = "Must withdraw a positive amount";
        // } else if (amountToWithdraw > selectedRowInfo.amount) {
		} else if ((parseFloat(amountToWithdraw,10)>parseFloat(selectedRowInfo.amount,10))){
            console.log("Cannot withdraw more than the deposit amount");
            withdrawMessage = "Cannot withdraw more than the deposit amount";
        } else {
            // Do withdraw
            let charityVault = getCharityVaultContractByAddress(selectedRowInfo.charity_vault_address, signer);
            await charityVault.withdraw(String(bigInt(amountToWithdraw * (10 ** 18))));
            withdrawMessage = "Withdrew successfully!";
        }
        setShowWithdrawModal(false);
        setWithdrawErrorModalContent(withdrawMessage);
        setShowWithdrawErrorModal(true);
        setAmountToWithdraw("");
        // TODO: Make sure to try to refresh the deposit information here
    }

    return (
        <Page>
            <div className="withdraw-container">
                <div className="withdraw-header-container">
                    <h1 className="withdraw-header">Withdraw</h1>
                    <h6 className="withdraw-subheader">Select one of your deposits to withdraw.</h6>
                </div>
                <div className="table-container">
                    <WithdrawTable data={depositData} columns={columns} selectedRowVaultName={selectedRowVaultName} selectedRowGiftRate={selectedRowGiftRate} setSelectedRowInfo={setSelectedRowInfo} isLoading={isLoadingData} />
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
                        <span className="modal-span"><strong>Balance:</strong> {selectedRowInfo ? selectedRowInfo.amount : ""} {selectedRowInfo ? selectedRowInfo.token : ""}</span>
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
