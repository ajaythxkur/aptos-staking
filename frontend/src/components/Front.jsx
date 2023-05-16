import React from 'react'

const Front = ({ account }) => {
    return (
        <section className='connect-sec'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="d-flex gap-2 justify-content-center">
                            <button className='btn text-uppercase border rounded-0 connect-btn'>mint testnet nft</button>
                            <button className='btn text-uppercase border rounded-0 connect-btn'>get testnet faucet</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Front