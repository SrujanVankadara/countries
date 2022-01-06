
// Declare variables
var input, filter, table, tr, td, i, txtValue,data, sortDirection = false;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
table = document.getElementById("table");
tr = table.getElementsByTagName("tr");
 
 async function fetchText() {
    let response = await fetch('https://restcountries.com/v3.1/all');
    data = JSON.parse(await response.text());
	loadTableData(data);
}
window.onload = () => {	
	fetchText();
}
function loadTableData(data){
	if(data.length > 0){
		var temp ="";
		data.forEach((u) =>{
			temp += "<tr>";
			temp += "<td>"+u.name.official+"</td>";
			temp += "<td>"+u.capital+"</td>";
			temp += "<td>"+u.population+"</td>";
			temp += "<td>"+u.area+"</td>";
			temp += "<td>"+u.region+"</td>";			
			temp += "<td>"+u.borders+"</td>";
			temp += "</tr>";
		});
		document.getElementById("data").innerHTML = temp;
	}
}

function sortColumn(columnName){
	let dataType = typeof data[0][columnName];
	if(columnName.includes(".")){
		var arr = columnName.split(".");
		[a,b]=arr;
		dataType = typeof data[0][a][b];
	}
	sortDirection = !sortDirection;
	
	switch(dataType){
		case 'number':
			sortNumberColumn(sortDirection,columnName);
			break;
			
		case 'string':
			sortStringColumn(sortDirection,columnName);
			break;	
			
		case 'object' : 
			sortObjectColumn(sortDirection,columnName);
			break;
		
	}	
	loadTableData(data);
}

function sortNumberColumn(sort, columnName){
	data = data.sort((p1,p2) => {
		return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]; 
	})
}
function sortStringColumn(sort, columnName){
	if(columnName.includes(".")){
		var arr = columnName.split(".");
		[x,y]=arr;
		data.sort((a, b) => {
			return sort ? ((a[x][y] > b[x][y]) - (a[x][y] < b[x][y])) : ((a[x][y] < b[x][y]) - (a[x][y] > b[x][y]));
		});
	}
	else {
		data.sort((a, b) => {
			return sort ? ((a[columnName] > b[columnName]) - (a[columnName] < b[columnName])) : ((a[columnName] < b[columnName]) - (a[columnName] > b[columnName]));
		});
	}
}

function sortObjectColumn(sort, columnName){
	if(Array.isArray(data[0][columnName])){
		data.sort((a, b) => {
			return sort ? ((a[columnName] > b[columnName]) - (a[columnName] < b[columnName])) : ((a[columnName] < b[columnName]) - (a[columnName] > b[columnName]));
		})
	}
	
}
//Ending of Sort the Tables based on click of colum Header

//code for input search
function myFunction() {

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
//End code for input search
