import React, { useEffect, useState, useRef } from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { baseurl } from '../assets/contractBreachpdf'
import { pdfKeywords } from './Keywords';
import { TfiAngleDown } from 'react-icons/tfi';
import { TfiAngleUp } from 'react-icons/tfi';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfView = () => {
  const [base, setBase] = useState(baseurl)
  const [keywordsList, setKeywordsList] = useState([]);
  const [markState, setMarkState] = useState(0);
  const [occurence, setOccurence] = useState(0);
  const [scrollPos, setScrollPos] = useState([]);
  useEffect(() => {
    setKeywordsList(pdfKeywords.response.values);
  }, []);

  // ----------------------------------------Search for keyword and highlight text---------------------//
  var marked = [];
  marked = document.getElementsByTagName("mark");
  var totalOccurences = marked.length;
  const handleClick = (data) => {
    let text = data;
    let pdfData = document.getElementById("pdf-view");
    text = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$7");
    let pattern = new RegExp(`${text}`, "gi");
    pdfData.innerHTML = pdfData.textContent.replace(pattern, match => `<mark>${match}</mark>`);
    setOccurence(marked.length);
    for (var i = 0; i < marked.length; i++) {
      var rect = marked[i].getBoundingClientRect();
      scrollPos.push(rect.top);
    }
    scrollPos.sort(function (a, b) { return a - b });
    var coOrd = scrollPos[0];
    window.scrollTo(0, coOrd - 50);
    setMarkState(1);
  }
  //------------------------------------------- Next button-----------------------------------//
  const handleNext = () => {
    if (markState == scrollPos.length) {
      setMarkState(0);
      window.scrollTo(0, scrollPos[0] - 50);
    }
    else {
      var coOrd = scrollPos[markState];
      window.scrollTo(0, coOrd - 50);
      setMarkState(markState + 1);
    }
  }
  //--------------------------------------------------Next Button---------------------------------------//
  const scrollPrev=()=>{
    var coOrd = scrollPos[markState-1];
      window.scrollTo(0, coOrd - 50); 
  }
  const handlePrev = () => {
    console.log("prev",markState);
     scrollPrev(); 
      setMarkState(markState-1);
      if(markState==0){
        var coOrd = scrollPos[0];
        window.scrollTo(0, coOrd - 50); 
      }
  }
  return (
    <>
      <div className='row'>
        <div className='col-12 col-md-4 col-lg-4'>
          <div className='keywords'>
            <div className='heading d-flex justify-content-between px-3 py-2 align-items-center'>
              <span className='heading-text'>Contract-Breach</span>
              <span>Similarity Score:073</span>
            </div>
            {keywordsList && keywordsList.map((e, index) => {
              return (
                <ul>
                  <li key={index} className='d-flex justify-content-between px-1' onClick={() => { handleClick(e.value) }}><span className='keyword'><span>{index + 1} . </span>{e.value}</span><span className='count'>Count:11</span></li>

                </ul>
              )
            })}
          </div>
        </div>
        <div className='col-12 col-md-8 col-lg-8'>
          <div className='pdf-section'>
            <div className='btn-wrapper'>
              <div className='occur'>
                <button className='previous'  onClick={handlePrev}><TfiAngleUp /></button> 
                <input type="text" value={markState<0?0:markState} readOnly />
                <span>{totalOccurences}</span>
                <button className='next' disabled={markState == occurence.length ? true : false} onClick={handleNext}><TfiAngleDown /></button>
              </div>
             
            </div>
            <div id='pdf-view'>
              <div>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                  <Viewer fileUrl={base} ></Viewer>
                </Worker>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PdfView