import React,{ useEffect, useState,useRef} from 'react'
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
    const[markState,setMarkState]=useState(0);
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
      };
     
  
      // var found=[];
      // var val="s 24A of Limitation Act"
    //   function getPos(el) {
    //     for (var lx=0, ly=0;
    //          el != null;
    //          lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    //     return {x: lx,y: ly};
    // }
    const handleClick=(data)=>{
        console.log("keyword",data);
        let text=data;
        let pdfData=document.getElementById("pdf-view");
        text=text.replace(/[.*+?^${}()|[\]\\]/g,"\\$7");
        let pattern=new RegExp(`${text}`,"gi");
        pdfData.innerHTML=pdfData.textContent.replace(pattern,match=>`<mark>${match}</mark>`);
        var marked=document.getElementsByTagName("mark");
        console.log(marked.length);
       
        for (var i = 0; i < marked.length; i++) {  
            var rect = marked[i].getBoundingClientRect();
         console.log(rect.top, rect.left);
          }
          function scrollFirst(){
            return {
              // left: marked[0].getBoundingClientRect().left + window.scrollX,
              top: marked[0].getBoundingClientRect().top + window.scrollY
            };
          }
     scrollFirst();
    }
   
    const handleNext=()=>{
      setMarkState(markState+1);
      console.log("ok",markState);


    }
    // console.log(found);
             
   
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
          <button className='btn btn-warning' onClick={handleNext}>next</button>
            <section id='pdf-view'>
             
               
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