import Description from "./Description";
import Legend from "./Legend";

const Header = () => {
  return (
  <div style={{display:'flex',flexDirection:'column'}}>
     <div > <Description /></div>
     <div style={{alignSelf:'flex-end'}}> <Legend /></div>
      
  </div>
  )
};

export default Header;
