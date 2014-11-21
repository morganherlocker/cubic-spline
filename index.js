module.exports = function spline(x, xs, ys) {
  var ks = xs.map(function(){return 0})
  ks = getNaturalKs(xs, ys, ks)
  var i = 1;
  while(xs[i]<x) i++;
  var t = (x - xs[i-1]) / (xs[i] - xs[i-1]);
  var a =  ks[i-1]*(xs[i]-xs[i-1]) - (ys[i]-ys[i-1]);
  var b = -ks[i]*(xs[i]-xs[i-1]) + (ys[i]-ys[i-1]);
  var q = (1-t)*ys[i-1] + t*ys[i] + t*(1-t)*(a*(1-t)+b*t);
  return q;
}

function getNaturalKs (xs, ys, ks) {
  var n = xs.length-1;
  var A = zerosMat(n+1, n+2);
    
  for(var i=1; i<n; i++)  // rows
  {
    A[i][i-1] = 1/(xs[i] - xs[i-1]);
    A[i][i] = 2 * (1/(xs[i] - xs[i-1]) + 1/(xs[i+1] - xs[i])) ;
    A[i][i+1] = 1/(xs[i+1] - xs[i]);
    A[i][n+1] = 3*( (ys[i]-ys[i-1])/((xs[i] - xs[i-1])*(xs[i] - xs[i-1]))  +  (ys[i+1]-ys[i])/ ((xs[i+1] - xs[i])*(xs[i+1] - xs[i])) );
  }
  
  A[0][0] = 2/(xs[1] - xs[0]);
  A[0][1] = 1/(xs[1] - xs[0]);
  A[0][n+1] = 3 * (ys[1] - ys[0]) / ((xs[1]-xs[0])*(xs[1]-xs[0]));
  
  A[n][n-1] = 1/(xs[n] - xs[n-1]);
  A[n][n] = 2/(xs[n] - xs[n-1]);
  A[n][n+1] = 3 * (ys[n] - ys[n-1]) / ((xs[n]-xs[n-1])*(xs[n]-xs[n-1]));
    
  return solve(A, ks);    
}


function solve (A, ks) {
  var m = A.length;
  for(var k=0; k<m; k++)  // column
  {
    // pivot for column
    var i_max = 0; var vali = Number.NEGATIVE_INFINITY;
    for(var i=k; i<m; i++) if(A[i][k]>vali) { i_max = i; vali = A[i][k];}
    swapRows(A, k, i_max);    
    
    // for all rows below pivot
    for(var i=k+1; i<m; i++)
    {
      for(var j=k+1; j<m+1; j++)
        A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
        A[i][k] = 0;
    }
  }
  for(var i=m-1; i>=0; i--) // rows = columns
  {
    var v = A[i][m] / A[i][i];
    ks[i] = v;
    for(var j=i-1; j>=0; j--) // rows
    {
      A[j][m] -= A[j][i] * v;
      A[j][i] = 0;
    }
  }
  return ks;
}

function zerosMat (r,c) {
  var A = []; 
  for(var i=0; i<r; i++) {
    A.push([]); 
    for(var j=0; j<c; j++) A[i].push(0);
  } 
  return A;
}

function swapRows (m, k, l) {
  var p = m[k]; m[k] = m[l]; m[l] = p;
}
    
