
export function BytesToString(n) {
    if (n > 1e12) {  
        return (n/1e12).toFixed(2)+ "TB";  
    } else if ( n> 1e9) {
        return (n/1e9).toFixed(2)+ "GB";  
    } else if (n > 1e6) {
        return (n/1e6).toFixed(2)+ "MB";  
    } else if (n > 1e3) {
        return (n/1e3).toFixed(2)+ "KB";  
    } else {
        return n.toFixed(2)+ "B";  
    }
}


export function CounterToString(n) {
    if (n > 1e12) {  
        return (n/1e12).toFixed(2)+ "T";  
    } else if ( n> 1e9) {
        return (n/1e9).toFixed(2)+ "G";  
    } else if (n > 1e6) {
        return (n/1e6).toFixed(2)+ "M";  
    } else if (n > 1e3) {
        return (n/1e3).toFixed(2)+ "K";  
    } else {
        return Math.trunc(n)+ "";  
    }
}

