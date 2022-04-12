// Elements created in dom
document.body.innerHTML=
`<nav class="container">
<h1>Ice and Fire<h1></nav>
<div class="search">
<label for="number">Enter the book number</label><br>
<input type="text" value="" id="number" placehoder="Enter the number"><br>
<button onclick="getData()">Search</button>
</div>`
var call=document.createElement('div');
call.setAttribute("id","num1");
document.body.append(call);

// function is called to get data from api
async function getData(){
    try {
        
        let BookNum=document.getElementById("number").value
        let res = await fetch(`https://www.anapioficeandfire.com/api/books/${BookNum}`);
        let res1 = await res.json()
        // console.log(res1)
        var bookdate=res1.released;
        var date=new Date(bookdate).toDateString();
        var element=document.getElementById("num1");
        element.innerHTML=`
        <div class=char>
        <p><span>Book name:</span> ${res1.name}</p> 
        <p><span>ISBN:</span> ${res1.isbn}</p>
        <p><span>Authors name:</span> ${res1.authors}</p> 
        <p><span>Publisher's name:</span> ${res1.publisher}</p>
        <p><span>No of Pages:</span> ${res1.numberOfPages}<p>
        <p><span>Released date:</span> ${date}</p>
        <p><span>Character names:</div>`
        // for loop is used to fetch the charater data atleast five characters from the fetched data
        for(var i=0;i<5;i++){
            var character=await fetch(res1.characters[i]);
            var list=await character.json();
            // console.log(list);
            var listData=document.createElement("div");
            listData.setAttribute("id","listnames");
            listData.innerHTML=`<ul><li>${list.name}</li><ul>`
            var showData=document.getElementById("num1");
            showData.append(listData);
        }
        document.body.append(element);

    } catch(error){
    console.log(error);
    }
  
}
