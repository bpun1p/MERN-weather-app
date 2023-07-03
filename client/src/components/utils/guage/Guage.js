import './Guage.css';

export default function Guage(props) {
  
  const setGuageValue = (value) => {
    const guage = document.querySelector(".guage")

    if (value < 0 || value > 1) {
      return;
    }

    guage.querySelector(".guage-fill").style.transform = `rotate(${value / 2}turn)`;
    guage.querySelector(".guage-cover").textContent = `${value}%`;
  }

  return (
    <div className="guage">
      <div className="guage-body">
        <div className="guage-fill">
          <div className='guage-cover'></div>
        </div>
      </div>
    </div>
  );
}