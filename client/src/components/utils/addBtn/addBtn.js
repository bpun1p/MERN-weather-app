import './addBtn.css';

export default function AddBtn() {
  const handleClick = () => {
    console.log('clicked!')
  }
  return (
    <div className='add-btn_container'>
      <button className='add-btn' onClick={handleClick}>+</button>
    </div>
  )
};