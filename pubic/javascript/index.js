
$('document').ready(()=>{
    // posting a car list
    $('#new_list').submit((e) =>{     
    e.preventDefault();
    let houseName = $('#houseName').val();
    let housePrice = $('#housePrice').val();
    let houseYear = $('#houseYear').val();
    let houseImage;
    let user_id = localStorage.getItem('userId');
    let files = $('#houseImage')[0];
    houseImage = files.files[0].name
    
    $.ajax({
        url : 'http://localhost:3000/house',
        method: 'post',
        data: {
            houseName,
            housePrice,
            houseYear,
            user_id,
            houseImage
            
        }
    }).done((res) =>{
        console.log(res)
        window.location = '/';
    })
})


// displaying all the data that are stored in the data
    $.ajax({
        'url': "http://localhost:3000/house",
        'method': 'get'
    })
    .done((res) => {
        console.log('get data');
        console.log(res)
        res.forEach((elem, index)=>{
            $('#cardHouseList').append(
                `
                <div class="col-md-4 col-sm-6 col-xs-12 text-center mt-3 ">
                    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
                    <img src="images/${elem.houseImage}" alt="vintage-image" class="img-responsive card-img-top">
                        <div class="card-body mt-1">
                        <div class="card-title"><h4>${elem.houseName}</h4></div>
                        
                        
                        
                        <p>N${elem.housePrice}</p>
                        <p>${elem.houseYear} yr</p>
                       
                <div class="card-footer">          
                <span class="btn btn-primary form-control" onclick="(individual(${parseInt(elem.id)}))">view</span>  
                </div>        
                    </div>
                </div>
            </div>
                `
                // <a href="#" onclick="single(${index+1})"> ${elem.houseName} ${elem.housePrice}</a>
                // `
            )

        })
    }).catch((err) => console.log(err))
})




function update(i){
    let houseName = $('#houseName').val();
    let housePrice = $('#housePrice').val();
    let houseYear = $('#houseYear').val();
    let houseImage = $('#houseImage').val();
    console.log('ggggt')
    $.ajax({
        url : 'http://localhost:3000/house/'+i,
        method: 'patch',
        data: {
            houseName,
            housePrice,
            houseYear,
            houseImage
            
        }
    }).done((res) =>{
        console.log(res)
    })
}
// function deleteData(i){
//     $.ajax({
//         url : 'http://localhost:3000/house/'+i,
//         method : 'delete'
//     })
//     .done((res) => alert("the car is successfully deleted"))
//     .catch((err)=> console.log(err))
// }

function individual(i){
    $.ajax({
        'url': 'http://localhost:3000/house/'+i,
        'method' : 'get'
    })
    .done((res) => {
        console.log(res.housePrice, res.houseName, i)
        localStorage.setItem('singleId', i);
        window.location = 'single.html'
    }).catch((err) => console.log(err))

    
}