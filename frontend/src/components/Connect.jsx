import React, { useState } from 'react'
import toast from '../common/toast.js';
import { sleep } from "../common/helper.js";
const Connect = ({ setisConnected }) => {
    var defaultNetwork = "Testnet";
    const supportedWallet = [
        {
            name: "martian",
            key: "martian"
        },
        // {
        //     name:"rise",
        //     key:"rise"
        // }
    ];
    const TYPE_WALLET = {
        "martian": () => martianConn(),
        // "rise": () => riseConn()
    }
    const [loading, setLoading] = useState(false)
    async function martianConn() {
        if (!("martian" in window)) {
            window.open("https://www.martianwallet.xyz/", "_blank");
            return
        }
        setLoading(true)
        try {
            await window.martian.connect();
            let check = await window.martian.isConnected()
            if (!check) {
                return
            }
        } catch (err) {
            setLoading(false)
            toast.normal(err)
            return
        }
        const networks = await window.martian.getNetworks();
        const network = await window.martian.network();
        if (network != defaultNetwork) {
            const nodeUrl = networks["Testnet"][0];
            await window.martian.changeNetwork(nodeUrl);
        }
        let acc = await window.martian.account();
        Object.assign(acc, { wallet: "martian" });
        localStorage.setItem('account', JSON.stringify(acc));
        console.log("sleeping")
        await sleep(1500) //1.5 sec
        document.getElementById("connect-btn-close").click();
        setisConnected(true)
        setLoading(false)
        console.log("woke up")
    }
    // async function riseConn(){
    //     console.log("rise")
    // }



    return (
        <>
            <section className='connect-sec'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <button className='btn text-uppercase border rounded-0 connect-btn' data-bs-toggle="modal" data-bs-target="#connect-modal">connect</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="modal fade" id="connect-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="connectModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn text-uppercase border-0" data-bs-dismiss="modal" aria-label="Close" id="connect-btn-close">close</button>
                        </div>
                        <div className="modal-body py-3">
                            {supportedWallet.map((v, i) => (
                                <React.Fragment key={i}>
                                    {loading ?
                                        <button className="btn text-uppercase border rounded-0 w-100 mb-2 wallet-btn" type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                        :
                                        <button className='btn text-uppercase border rounded-0 w-100 mb-2 wallet-btn' onClick={TYPE_WALLET[v.key]}>
                                            {v.name}&nbsp;wallet
                                        </button>
                                    }
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connect