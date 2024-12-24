function Balence() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const balence = user.balance
    return (
      <div className="h-8 w-28 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
        <h2 className="text-center text-base font-semibold">Balance:{balence||0}$</h2>
        
      </div>
    );
  }
  
  export default Balence;
  