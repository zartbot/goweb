import React            from 'react';
import { Tag } from 'antd';

class PctTag extends React.Component{


  _pctRating(pct,render_mode)  {
      let rating = null;
      if (render_mode == "asc") {
        switch(true) {
          case ( pct > 90.0):
              rating = "Execellent";
              break;
          case ( pct > 80.0):
              rating = "Very Good";
              break;
          case ( pct > 70.0):
              rating = "Good";
              break;
          case ( pct > 60.0):
              rating = "Average";
              break;
          case ( pct > 30.0):
              rating = "Poor";
              break;
          case ( pct > 15.0):
              rating = "Dissatisfied";
              break;              
          default:
              rating = "Very Dissatisfied";
        }      
    } else if (render_mode == "desc") {
        switch(true) {
            case ( pct > 90.0):
                rating = "Very Dissatisfied";
                break;
            case ( pct > 80.0):
                rating = "Dissatisfied";
                break;
            case ( pct > 70.0):
                rating = "Poor";
                break;
            case ( pct > 60.0):
                rating = "Average";
                break;
            case ( pct > 30.0):
                rating = "Good";
                break;
            case ( pct > 15.0):
                rating = "Very Good";
                break;              
            default:
                rating = "Execellent";
          }    
    }
    return rating;
  } 
  _pctStyle(pct,render_mode) {
    let rating = null;
    if (render_mode == "asc") {
      switch(true) {
        case ( pct > 90.0):
            rating = "purple";
            break;
        case ( pct > 80.0):
            rating = "blue";
            break;
        case ( pct > 70.0):
            rating = "cyan";
            break;
        case ( pct > 60.0):
            rating = "green";
            break;
        case ( pct > 30.0):
            rating = "orange";
            break;
        case ( pct > 15.0):
            rating = "red";
            break;              
        default:
            rating = "pink";
      }      
  } else if (render_mode == "desc") {
      switch(true) {
          case ( pct > 90.0):
              rating = "pink";
              break;
          case ( pct > 80.0):
              rating = "red";
              break;
          case ( pct > 70.0):
              rating = "orange";
              break;
          case ( pct > 60.0):
              rating = "green";
              break;
          case ( pct > 30.0):
              rating = "cyan";
              break;
          case ( pct > 15.0):
              rating = "blue";
              break;              
          default:
              rating = "purple";
        }    
  }
  return rating;
} 

render(){
  let tagtext = this._pctRating(this.props.pct,this.props.render_mode);  
  let color = this._pctStyle(this.props.pct,this.props.render_mode);
  return (
  <Tag color={color}>
  {tagtext}
  </Tag>);
  }
}

export default PctTag;

