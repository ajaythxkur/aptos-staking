import React, { useState } from 'react';
import { sleep } from '../common/helper';

const Header = ({ account, setisConnected }) => {
    const TYPE_WALLET = {
        "martian": () => martianDisConn(),
    }
    const TYPE_MINT = {
        "martian": () => martianMint()
    }
    const [loading, setLoading] = useState(false);
    async function martianDisConn() {
        setLoading(true)
        await window.martian.disconnect();
        localStorage.removeItem('account')
        console.log("sleeping")
        await sleep(1000);
        setisConnected(false)
        console.log("woke up")
    }
    async function copy() {
        var copyText = document.getElementById("account_address");
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand("copy");
    }
    async function martianMint() {
        console.log("mint in martian")
        // Create a collection
        const collectionHash = await window.martian.createCollection("Immutable Legends Testnet", "A collection of thousands of Legends on test network", "https://aptos.dev");
        // Create a token
        const tokenHash = await window.martian.createToken("Immutable Legends Testnet", "Immutable Legends #1", "1/1 art", 1, "https://aptos.dev/img/nyan.jpeg", 1);
        console.log(tokenHash)
    }
    return (
        <React.Fragment>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">IMMU LEGENDS</a>
                    <div className="d-flex gap-2 align-items-center">

                        <div className="input-group account-info">

                            <input type="text" id="account_address" className="form-control rounded-0" value={account != null ? account.address : 'error please relogin!!'} onChange={() => { }} />
                            <span className="input-group-text rounded-0" id="basic-addon2">
                                <button className='btn p-0 border-0' onClick={() => copy()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20" fill='var(--white)'><path d="M180 976q-24 0-42-18t-18-42h60v60Zm-60-144v-84h60v84h-60Zm0-168v-84h60v84h-60Zm0-168v-84h60v84h-60Zm0-168q0-24 18-42t42-18v60h-60Zm144 648v-60h84v60h-84Zm60-144q-24 0-42-18t-18-42V236q0-24 18-42t42-18h416q24 0 42 18t18 42v536q0 24-18 42t-42 18H324Zm0-60h416V236H324v536Zm108 204v-60h84v60h-84Zm168 0v-60h60q0 24-18 42t-42 18Z" /></svg>
                                </button>
                            </span>
                        </div>
                        {loading ?
                            <button className="btn text-uppercase border rounded-0 w-100 wallet-btn" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            :
                            <button className="btn text-uppercase border rounded-0 w-100 wallet-btn" type="button" onClick={TYPE_WALLET[account != null ? account.wallet : '']}>disconnect</button>
                        }
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header;