import React            from 'react';
import '../assets/pct.scss';

class PctSPAN extends React.Component{
  _pctStyle(pct,render_mode) {
    let styleclass = null;
    if (render_mode == "asc") {
        switch(true) {
            case ( pct > 90.0):
                styleclass = "pct_1";
                break;
            case ( pct > 80.0):
                styleclass = "pct_2";
                break;                
            case ( pct > 70.0):
                styleclass = "pct_3";
                break;             
            case ( pct > 60.0):
                styleclass = "pct_4";
                break;   
                case ( pct > 40.0):
                styleclass = "pct_5";
                break;             
                case ( pct > 15.0):
                styleclass = "pct_6";
                break;                                                              
            default:
                styleclass = "pct_7";
        }      
    } else if (render_mode == "desc") {
        switch(true) {
          case ( pct > 90.0):
          styleclass = "pct_7";
          break;
      case ( pct > 80.0):
          styleclass = "pct_6";
          break;                
      case ( pct > 70.0):
          styleclass = "pct_5";
          break;             
      case ( pct > 60.0):
          styleclass = "pct_4";
          break;   
          case ( pct > 40.0):
          styleclass = "pct_3";
          break;             
          case ( pct > 15.0):
          styleclass = "pct_2";
          break;                                                              
      default:
          styleclass = "pct_1";
        }
    }
    return styleclass;
}
render(){
  let data = this.props.data;
  let style = this._pctStyle(this.props.pct,this.props.render_mode);
  return (
  <span className={style}>
  {this.props.data}
  </span>);
  }
}

export default PctSPAN;