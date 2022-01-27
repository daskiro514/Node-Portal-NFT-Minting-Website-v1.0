import React from 'react'
import { connect } from 'react-redux'
import Web3 from "web3"
import Web3Modal from "web3modal"
import logo from '../../img/logo5.JPG'
import ellipseAddress from '../../utils/ellipseAddress'
import { setAlert } from '../../actions/alert'

const Dashboard = ({ setAlert }) => {

  const providerOptions = {
    /* See Provider Options Section */
  }

  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  })

  // const [provider, setProvider] = React.useState(null)
  // const [web3, setWeb3] = React.useState(null)
  const [walletAddress, setWalletAddress] = React.useState(null)

  const [mintValue, setMintValue] = React.useState(2)
  const mintMaxValue = 50

  const mintValueIncrement = () => {
    if (mintValue + 1 > mintMaxValue) {
      setAlert('Maximum Value Overflow', 'warning')
      return
    }
    setMintValue(mintValue + 1)
  }

  const mintValueDecrement = () => {
    if (mintValue - 1 < 1) {
      setAlert('It can not be set as 0', 'warning')
      return
    }
    setMintValue(mintValue - 1)
  }

  const connectWallet = async () => {
    let _provider = null
    let _web3 = null
    let _accounts = null

    _provider = await web3Modal.connect()
    _web3 = new Web3(_provider)
    _accounts = await _web3.eth.getAccounts()

    // setProvider(_provider)
    // setWeb3(_web3)
    setWalletAddress(_accounts[0].toLowerCase())
  }

  const disconnectWallet = async () => {
    setWalletAddress(null)
    // setProvider(null)
    // setWeb3(null)
  }

  const [tab, setTab] = React.useState('Genesis')

  return (
    <div className='customer-dashboard bg-dark text-white'>
      <div className='left-image'></div>
      <div className='right-image'></div>
      <div className='container-fluid'>
        <div className='row bg-dark header-box-shadow'>
          <div className='col-md-4 p-4'>
            <img src={logo} alt='SETIMAGE' height='40px' />
          </div>
          <div className='col-md-4 text-center text-primary h3 p-4'>
            <i className='fa fa-university'></i>
            <span className='ml-2'>Staking</span>
          </div>
          <div className='col-md-4 text-right p-4'>
            {walletAddress
              ?
              <>
                <span className='mr-3'>{ellipseAddress(walletAddress)}</span>
                <button
                  className='btn btn-primary rounded-pill'
                  onClick={() => disconnectWallet()}
                >
                  Disconnect
                </button>
              </>
              :
              <button
                className='btn btn-primary rounded-pill'
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </button>
            }
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center mt-4'>
          <div className='text-primary mr-3'>My Node NFTs</div>
          <div className='h1'>22</div>
        </div>
        <div className='text-center'>
          <i onClick={() => mintValueDecrement()} className="fa fa-minus h3 mr-3 font-weight-lighter cursor-pointer"></i>
          <input
            type='number'
            value={mintValue}
            className='stack-input h3'
            onChange={e => setMintValue(e.target.value)}
          />
          <i onClick={() => mintValueIncrement()} className="fa fa-plus h3 ml-3 font-weight-lighter cursor-pointer"></i>
        </div>
        <div className='text-center mt-4'>
          <div>
            <button className='btn btn-primary rounded-pill'>
              Mint Node NFT
            </button>
          </div>
        </div>
        <div className='row py-5'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <div className='box-shadow rounded-lg'>
              <div className='row'>
                <div className='col-md-4 text-center cursor-pointer' onClick={() => setTab('Genesis')}>
                  <div className={'p-2 ' + (tab === 'Genesis' ? 'box-shadow-bold' : null)}>
                    Genesis
                  </div>
                </div>
                <div className='col-md-4 text-center cursor-pointer' onClick={() => setTab('Gen1 And Beyond')}>
                  <div className={'p-2 ' + (tab === 'Gen1 And Beyond' ? 'box-shadow-bold' : null)}>
                    Gen1 And Beyond
                  </div>
                </div>
                <div className='col-md-4 text-center cursor-pointer' onClick={() => setTab('Dark matter')}>
                  <div className={'p-2 ' + (tab === 'Dark matter' ? 'box-shadow-bold' : null)}>
                    Dark matter
                  </div>
                </div>
              </div>
            </div>
            {tab === 'Genesis'
              ?
              <div className='box-shadow rounded-lg p-3'>
                <div className='pt-2 text-center text-primary'>My Genesis Node NFT</div>
                <div className='h1 text-center'>2</div>
                <div className='table-responsive'>
                  <table className='table table-borderless'>
                    <thead>
                      <tr className='text-white'>
                        <th>NODE NFT</th>
                        <th>MINTED ON</th>
                        <th>TRADING FEE</th>
                        <th>MINTING FEE</th>
                        <th>APY</th>
                        <th>FEE DUE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((item, index) =>
                        <tr key={index} className='text-primary'>
                          <td className='align-middle'>
                            <span className='badge rounded-pill bg-primary text-primary font-18 mr-2'>8</span>
                            0x8be3...37e
                          </td>
                          <td className='align-middle'>Feb 4. 2022</td>
                          <td className='align-middle'>10.55</td>
                          <td className='align-middle'>10.55</td>
                          <td className='align-middle'>10.55</td>
                          <td className='align-middle'>
                            <button className='btn btn-sm btn-primary rounded-pill'>Pay Fee</button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className='text-right mr-3'>
                    <button className='btn btn-sm btn-primary rounded-pill'>
                      Pay All Node Fees
                    </button>
                  </div>
                </div>
              </div>
              : tab === 'Gen1 And Beyond'
                ?
                <div className='box-shadow rounded-lg p-3'>
                  <div className='pt-2 text-center text-primary'>My Generation Node NFTs</div>
                  <div className='h1 text-center'>20</div>
                  <div className='table-responsive'>
                    {[1, 2].map((item, index) =>
                      <div key={index} className='p-2'>
                        <label className='text-primary'>Generation {index + 1}</label>
                        <table className='box-shadow rounded-lg table table-borderless'>
                          <thead>
                            <tr className='text-white'>
                              <th>NODE NFT</th>
                              <th>MINTED ON</th>
                              <th>TRADING FEE</th>
                              <th>MINTING FEE</th>
                              <th>APY</th>
                              <th>FEE DUE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[1, 2].map((item, index) =>
                              <tr key={index} className='text-primary'>
                                <td className='align-middle'>
                                  <span className='badge rounded-pill bg-primary text-primary font-18 mr-2'>8</span>
                                  0x8be3...37e
                                </td>
                                <td className='align-middle'>Feb 4. 2022</td>
                                <td className='align-middle'>10.55</td>
                                <td className='align-middle'>10.55</td>
                                <td className='align-middle'>10.55</td>
                                <td className='align-middle'>
                                  <button className='btn btn-sm btn-primary rounded-pill'>Pay Fee</button>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className='text-right'>
                          <button className='btn btn-sm btn-primary rounded-pill'>
                            Pay All Node Fees
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                :
                <div className='box-shadow rounded-lg p-3'>

                </div>
            }
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { setAlert })(Dashboard)