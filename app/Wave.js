import {useState, useRef, useEffect, useLayoutEffect} from 'react'
import React from 'react';
import * as d3 from "d3";

function useWindowSize(element) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([element.current.clientWidth, element.current.clientHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);}
  }, []);
  return size;
}

function randomPath(width, h) {
  const w = width;
  const a = h/6;
  const xs = w/8;
  const z = 1000;
  var da1 = Math.random() * a * 4 - 2*a;
  var da2 = Math.random() * a * 4 - 2*a;
  var da3 = Math.random() * a * 4 - 2*a;

  const p0x = w + z;
  const p0y = h/2;

  const p1x = w-xs;
  const p1y = h/2;

  const p2x = w-xs;
  const p2y = h/2-a;

  const p3x = w-2*xs;
  const p3y = h/2-a;

  const p4x = w-3*xs;
  const p4y = h/2-a;
  
  const p2x2 = w-xs;
  const p2y2 = h/2-a + da1;

  const p3x2 = w-2*xs;
  const p3y2 = h/2-a + da1;

  const p4x2 = w-3*xs;
  const p4y2 = h/2-a + da1;            

  const p5x = w-3*xs;
  const p5y = h/2;

  const p6x = w-4*xs;
  const p6y = h/2;

  const p7x = w-5*xs;
  const p7y = h/2;
  
  const p5x2 = w-3*xs;
  const p5y2 = h/2 + da2;

  const p6x2 = w-4*xs;
  const p6y2 = h/2 + da2;

  const p7x2 = w-5*xs;
  const p7y2 = h/2 + da2;            

  const p8x = w-5*xs;
  const p8y = h/2+a;

  const p9x = w-6*xs;  
  const p9y = h/2+a;

  const p10x = w-7*xs;  
  const p10y = h/2+a;
  
  const p8x2 = w-5*xs;
  const p8y2 = h/2+a + da3;

  const p9x2 = w-6*xs;  
  const p9y2 = h/2+a + da3;

  const p10x2 = w-7*xs;  
  const p10y2 = h/2+a + da3;            

  const p11x = w-7*xs;  
  const p11y = h/2;

  const p12x = w-8*xs-z;  
  const p12y = h/2;      
  
          var path =' M ' + p0x + ' ' + p0y + 
                    ' C ' + ~~p1x + ' ' + ~~p1y + ', '+ ~~p2x2 + ' ' + ~~p2y2 + ', '+ ~~p3x2 + ' ' + ~~p3y2 +  
                    ' C ' + ~~p4x2 + ' ' + ~~p4y2 + ', '+ ~~p5x2 + ' ' + ~~p5y2 + ', '+ ~~p6x2 + ' ' + ~~p6y2 +
                    ' C ' + ~~p7x2 + ' ' + ~~p7y2 + ', '+ ~~p8x2 + ' ' + ~~p8y2 + ', '+ ~~p9x2 + ' ' + ~~p9y2 +
                    ' C ' + ~~p10x2 + ' ' + ~~p10y2 + ', '+ ~~p11x + ' ' + ~~p11y + ', '+ ~~p12x + ' ' + ~~p12y + 
                    ' L -1000 '+ p0y + ' L -1000 ' + (h + 1 + z) + ' L ' + (w + 1000) +' '+ (h + 1 + z) + ' Z';
          return path;           
}  

const Wave = (props) => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const [width, height] = useWindowSize(svgRef);
  var [rndState, setRndState] = useState(0);
  const started1 = useRef(false);
  const started2 = useRef(false);
  const d3interval = useRef(null);
  const latch = useRef(false);
  

  //const d = randomPath(width, height);

  useEffect(() => {
    // set inital state
    d3.select(pathRef.current)
    .attr("fill", "#0d4150")
    .attr('d', function (d) {
      return randomPath(width, height);
    });

    setRndState(Math.random());

    // kick off updates
    d3interval.current = d3.interval(kickOffUpdate, 3000);
  }, [])

  function kickOffUpdate(){
    setRndState(Math.random());
  }

  useEffect(() => {
      // update state
      d3.select(pathRef.current)
        .attr("fill", "#0d4150")
        .transition()
        .ease(d3.easeSinOut)
        .duration(2500)
        .attr('d', function (d) {
           return randomPath(width, height);
        });
    }
  , [rndState]);  

  return (
    <svg ref={svgRef} width="100%" height="100%">
      <g>
        <path ref={pathRef} fill="#0d4150" className='wave1'></path>
      </g>
    </svg>
  );

}

  export default Wave;