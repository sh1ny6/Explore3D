 const modelscar = document.getElementsByClassName('modelscar')

export default function Button({ children, onClick, isActive }) {
  return (
    <button
    //   id={
        
    //   }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
