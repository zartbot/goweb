function percentage_bar($percentage,$width,$leftlabel,$rightlabel)
{
   if (  $percentage > '100') { $percentage = '100'; }
   if  ( $percentage > '90') {  $color2='c4323f'; $color1='C96A73'; }
   elseif ($percentage > '80') { $color2='cc4c02'; $color1='fe9929'; }
   elseif ($percentage > '75') { $color2='bf5d5b'; $color1='d39392'; }
   elseif ($percentage > '60') { $color2='bf875b'; $color1='d3ae92'; }
   elseif ($percentage > '40') { $color2='6a51a3'; $color1='9e9ac8'; }
   elseif ($percentage > '15') { $color2='5b93bf'; $color1='92b7d3'; }
   else { $color2='9abf5b'; $color1='bbd392'; }

   $remain = 100 - (int)($percentage);
   $output = '<div class="percbar" style="background-color:#'.$color1.';border-color:#'.$color2.';width:'.$width.'">';
   $output .= '<div class="bar" style="width:'.$percentage.'%; background-color:#'.$color2.';"></div>';
   if ( $remain >0 ) {
     $output .= '<div class="bar" style="width:'.$remain.'%;"></div>'  ;
   }
   if ( $rightlabel != "" )  {
     $output .= '<div class="bar-text" style="margin-left: -100px; margin-top: 0px; float: right; text-align: right; ">'.$rightlabel.'</div>'  ;
   }
   if ( $leftlabel != "" )  {
     $output .= '<div class="bar-text" style="width:100%; max-width:100%; padding-left: 4px;">'.$leftlabel.'</div>'  ;
   }
   $output .= '</div>';
   return $output;
}

