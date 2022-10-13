import React,{useState} from 'react'

const PdfView = () => {
    const[pdfFile,setPdfFile]=useState(null);
  return (
    <>
    <div className='row'>
        <div className='col-12 col-md-4 col-lg-3'>
            <div className='keywords'>
                <div className='heading'>
                    <h5>Contract-Breach</h5>
                    <p>Similarity Score:073</p>
                </div>
                <ul>
                    <li className='d-flex justify-content-between'><span className='keyword'><span>1.</span>Contact</span><span className='count'>Count:11</span></li>
                   
                </ul>
            </div>
        </div>
        <div className='col-12 col-md-8 col-lg-9'>
            <div className='pdf-view'>

            </div>
            
        </div>
    </div>

    </>
  )
}

export default PdfView