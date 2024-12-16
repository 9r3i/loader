/* index.js */

function test(){
  return (new SplashScreenLoader).test(r=>{
    var a=document.createElement('button');
    a.innerText='Try again!';
    a.classList.add('splash-screen-try-again');
    a.onclick=function(e){
      this.parentNode.removeChild(this);
      return test();
    };
    document.body.appendChild(a);
  });
}
function testLoad(){
  var ssl=new SplashScreenLoader,
  max=1000,
  cb=function(){
    setTimeout(()=>{
      ssl.close();
      var a=document.createElement('button');
      a.innerText='Try again!';
      a.classList.add('splash-screen-try-again');
      a.onclick=function(e){
        this.parentNode.removeChild(this);
        return testLoad();
      };
      document.body.appendChild(a);
    },500);
  };
  ssl.text='Downloading...';
  ssl.textLoaded='Downloaded.';
  ssl.open();
  setTimeout(()=>{
    testLoading(cb,ssl,max);
  },1500);
}
function testLoading(c,r,m,i){
  i=i?parseInt(i,10):0;
  if(i>=m){return c(true);}
  i+=Math.floor(Math.random()*25);
  i=Math.min(i,m);
  setTimeout(()=>{
    r.loading({
      loaded:i,
      total:m,
    });
    testLoading(c,r,m,i);
  },10);
}


