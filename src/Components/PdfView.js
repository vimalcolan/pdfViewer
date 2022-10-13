import React,{ useEffect, useState} from 'react'
import { Document, Page } from "react-pdf";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import {baseurl} from '../assets/contractBreachpdf'
import {pdfKeywords} from './Keywords'

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfView = ({pdf}) => {
    const[base,setBase]=useState(baseurl)
    const[pdfFile,setPdfFile]=useState(null);
    const[pageNumber,setPageNumber]=useState(1);
    const[keywordsList,setKeywordsList]=useState([]);
    useEffect(()=>{
        setKeywordsList(pdfKeywords.response.values);
    },[])
    
 
    // const onDocumentLoadSuccess = ({ pdfFile }) => {
	// setPdfFile(pdfFile);
    // setPageNumber(1);
	// };
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
      }
    
      function previousPage() {
        changePage(-1);
      }
    
      function nextPage() {
        changePage(1);
      }
      var pdfDOc=document.getElementsByTagName("section")
      var pdfData=document.getElementsByTagName("span");
  
      var found=[];
      var val="s 24A of Limitation Act"
    const handleClick=(data)=>{
        console.log("keyword",data);
        for (var i = 0; i < pdfData.length; i++) {  
            if (pdfData[i].innerText == val) {
              found.push(pdfData[i].innerText);
          
            }
          }
      
    }
    console.log(found);
             
   
  return (
    <>
    <div className='row'>
        <div className='col-12 col-md-4 col-lg-3'>
            <div className='keywords'>
                <div className='heading'>
                    <h5>Contract-Breach</h5>
                    <p>Similarity Score:073</p>
                </div>
             {keywordsList&&keywordsList.map((e,index)=>{
                  return(
                    <ul>
                    <li key={index} className='d-flex justify-content-between' onClick={()=>{handleClick(e.value)}}><span className='keyword'><span>1.</span>{e.value}</span><span className='count'>Count:11</span></li>
                   
                </ul>
                  )
             })}
            </div>
        </div>
        <div className='col-12 col-md-8 col-lg-9'>
            <section className='pdf-view'>
             
               
                    <div>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                    <Viewer fileUrl={base} ></Viewer>;
                    {/* <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />

      </Document> */}
</Worker>

      <div>
        <p>
          Page {pageNumber || (pdfFile ? 1 : "--")} of {pdfFile || "--"}
        </p>
        <button type="button" className='btn btn-primary' disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button className='btn btn-success'
          type="button"
          disabled={pageNumber >= pdfFile}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
                    </div>
              

            </section>
            
        </div>
    </div>

    </>
  )
}

export default PdfView