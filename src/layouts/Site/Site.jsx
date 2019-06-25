import React from 'react'
import { Link } from "react-router-dom";

export default props => {
    return (
        <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>SITE EM CONSTRUÇÃO</h1>
            <br />
            <div>
                <button type="button" className="btn btn-danger">
                    <Link style={{ color: 'black' }}
                        to='/app'>
                        Acesso ao Monitoramento 
                    </Link>
                </button>
            </div>
        </div>
    )
}