import React from 'react'

const Connect = () => {
    const supportedWallet = [
        {
            name:"martian",
            key:"martian"
        },
        {
            name:"rise",
            key:"rise"
        }
    ];
    const TYPE_WALLET = {
        "martian": () => martianConn(),
        "rise": () => riseConn()
    }
    async function martianConn(){
        if (!("martian" in window)) {
            window.open("https://www.martianwallet.xyz/", "_blank");
            return
        }
        try{
            await window.martian.connect();
        }catch(err){
            console.log(err)
        }
    }
    async function riseConn(){
        console.log("rise")
    }



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
                            {supportedWallet.map((v,i)=>(
                                <button className='btn text-uppercase border rounded-0 w-100 mb-2 wallet-btn' key={i} onClick={TYPE_WALLET[v.key]}>
                                    {v.name}&nbsp;wallet
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Connect