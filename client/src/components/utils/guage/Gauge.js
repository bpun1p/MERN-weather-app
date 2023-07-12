import './Gauge.css';
import { useRef, useEffect } from 'react';

export default function Gauge(props) {
  const gaugeElement = useRef();

  useEffect(() => {
    const gauge = gaugeElement.current;
    setGaugeValue(gauge, props.value/100)
  }, [])
  
  function setGaugeValue(element, value) {
    if (value < 0 || value > 1) {
      return;
    }

    element.querySelector(".gauge-fill").style.transform = `rotate(${
      value / 2
    }turn)`;
    element.querySelector(".gauge-cover").textContent = `${Math.round(
      value * 100
    )}%`;
  }

  return (
    <div ref={gaugeElement} className="gauge">
      <div className="gauge-body">
        <div className="gauge-fill"></div>
          <div className='gauge-cover'></div>
      </div>
    </div>
  );
}
  

